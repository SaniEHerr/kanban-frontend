import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
interface SocketError {
  message: string;
  code?: string;
  details?: any;
}

interface SocketConfig {
  url: string;
  maxReconnectAttempts: number;
  reconnectDelay: number;
  timeout: number;
}

// Configuración del socket
const socketConfig: SocketConfig = {
  url: "http://localhost:3000",
  maxReconnectAttempts: 5,
  reconnectDelay: 1000,
  timeout: 10000,
};

// Estado del socket
let reconnectAttempts = 0;
let isReconnecting = false;

// Crear instancia del socket con configuración robusta
export const kanbanSocket: Socket = io(socketConfig.url, {
  transports: ["websocket"],
  timeout: socketConfig.timeout,
  reconnection: true,
  reconnectionAttempts: socketConfig.maxReconnectAttempts,
  reconnectionDelay: socketConfig.reconnectDelay,
  reconnectionDelayMax: 5000,
});

// Manejo de eventos de conexión
kanbanSocket.on("connect", () => {
  console.log("Conectado al backend con id:", kanbanSocket.id);
  reconnectAttempts = 0;
  isReconnecting = false;
  toast.success("Connected to the server");
});

kanbanSocket.on("disconnect", (reason) => {
  console.log("Desconectado del backend:", reason);
  isReconnecting = false;
  
  if (reason === "io server disconnect") {
    // El servidor desconectó explícitamente
    toast.error("Disconnected from the server");
  } else if (reason === "io client disconnect") {
    // El cliente desconectó explícitamente
    console.log("Cliente desconectado manualmente");
  } else {
    // Desconexión inesperada
    toast.error("Connection lost. Reconnecting...");
  }
});

// Manejo de reconexión
kanbanSocket.on("reconnect_attempt", (attemptNumber) => {
  console.log(`Intento de reconexión ${attemptNumber}/${socketConfig.maxReconnectAttempts}`);
  isReconnecting = true;
  reconnectAttempts = attemptNumber;
  
  if (attemptNumber === 1) {
    toast.info("Reconectando al servidor...");
  }
});

kanbanSocket.on("reconnect", (attemptNumber) => {
  console.log(`Reconectado después de ${attemptNumber} intentos`);
  isReconnecting = false;
  reconnectAttempts = 0;
  toast.success("Reconnected to the server");
});

kanbanSocket.on("reconnect_failed", () => {
  console.log("Falló la reconexión después de todos los intentos");
  isReconnecting = false;
  toast.error("Failed to reconnect to the server. Reload the page.");
});

// Manejo de errores de conexión
kanbanSocket.on("connect_error", (error) => {
  console.error("Error de conexión:", error);
  isReconnecting = false;
  
  if (error.message.includes("timeout")) {
    toast.error("Connection timeout. Check your internet connection.");
  } else if (error.message.includes("xhr poll error")) {
    toast.error("Network error. Check your connection.");
  } else {
    toast.error(`Connection error: ${error.message}`);
  }
});

// Manejo de errores generales
kanbanSocket.on("error", (error: SocketError) => {
  console.error("Error del socket:", error);
  toast.error(`Socket error: ${error.message}`);
});

// Función para emitir con manejo de errores
export const emitWithErrorHandling = (
  event: string, 
  data: any, 
  onSuccess?: () => void,
  onError?: (error: SocketError) => void
) => {
  if (!kanbanSocket.connected) {
    const error: SocketError = {
      message: "There is no connection to the server",
      code: "NO_CONNECTION"
    };
    
    toast.error("There is no connection to the server. Try again.");
    onError?.(error);
    return;
  }

  try {
    kanbanSocket.emit(event, data, (response: any) => {
      if (response?.error) {
        const error: SocketError = {
          message: response.error.message || "Error in the operation",
          code: response.error.code,
          details: response.error.details
        };
        
        console.error(`Error en evento ${event}:`, error);
        toast.error(error.message);
        onError?.(error);
      } else {
        console.log(`Evento ${event} exitoso:`, response);
        onSuccess?.();
      }
    });
  } catch (error) {
    const socketError: SocketError = {
      message: error instanceof Error ? error.message : "Unknown error",
      code: "EMIT_ERROR"
    };
    
    console.error(`Error al emitir evento ${event}:`, socketError);
    toast.error(socketError.message);
    onError?.(socketError);
  }
};

// Función para verificar el estado de la conexión
export const isSocketConnected = (): boolean => {
  return kanbanSocket.connected && !isReconnecting;
};

// Función para obtener el estado de reconexión
export const isSocketReconnecting = (): boolean => {
  return isReconnecting;
};

// Función para obtener el número de intentos de reconexión
export const getReconnectAttempts = (): number => {
  return reconnectAttempts;
};

// Función para reconectar manualmente
export const reconnectSocket = (): void => {
  if (!kanbanSocket.connected && !isReconnecting) {
    console.log("Reconexión manual iniciada");
    kanbanSocket.connect();
  }
};

// Función para desconectar manualmente
export const disconnectSocket = (): void => {
  console.log("Desconexión manual");
  kanbanSocket.disconnect();
};
