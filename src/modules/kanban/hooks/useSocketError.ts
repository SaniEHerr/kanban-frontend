import { useState, useEffect, useCallback } from 'react';
import { kanbanSocket, isSocketConnected, isSocketReconnecting, getReconnectAttempts, reconnectSocket } from '@/socket';
import { toast } from 'sonner';

interface SocketError {
  message: string;
  code?: string;
  details?: any;
}

interface UseSocketErrorReturn {
  isConnected: boolean;
  isReconnecting: boolean;
  reconnectAttempts: number;
  hasError: boolean;
  error: SocketError | null;
  reconnect: () => void;
  clearError: () => void;
}

export const useSocketError = (): UseSocketErrorReturn => {
  const [isConnected, setIsConnected] = useState(isSocketConnected());
  const [isReconnecting, setIsReconnecting] = useState(isSocketReconnecting());
  const [reconnectAttempts, setReconnectAttempts] = useState(getReconnectAttempts());
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<SocketError | null>(null);

  // Actualizar estado de conexión
  const updateConnectionStatus = useCallback(() => {
    setIsConnected(isSocketConnected());
    setIsReconnecting(isSocketReconnecting());
    setReconnectAttempts(getReconnectAttempts());
  }, []);

  // Manejar errores
  const handleError = useCallback((error: SocketError) => {
    setError(error);
    setHasError(true);
    console.error('Error de socket:', error);
  }, []);

  // Limpiar errores
  const clearError = useCallback(() => {
    setError(null);
    setHasError(false);
  }, []);

  // Reconectar manualmente
  const reconnect = useCallback(() => {
    clearError();
    reconnectSocket();
    toast.info('Reconectando al servidor...');
  }, [clearError]);

  useEffect(() => {
    // Eventos de conexión
    const handleConnect = () => {
      updateConnectionStatus();
      clearError();
    };

    const handleDisconnect = (reason: string) => {
      updateConnectionStatus();
      if (reason !== 'io client disconnect') {
        handleError({
          message: 'Conexión perdida',
          code: 'DISCONNECTED'
        });
      }
    };

    const handleReconnectAttempt = (attemptNumber: number) => {
      updateConnectionStatus();
      if (attemptNumber === 1) {
        handleError({
          message: 'Reconectando al servidor...',
          code: 'RECONNECTING'
        });
      }
    };

    const handleReconnect = (attemptNumber: number) => {
      updateConnectionStatus();
      clearError();
      toast.success(`Reconectado después de ${attemptNumber} intentos`);
    };

    const handleReconnectFailed = () => {
      updateConnectionStatus();
      handleError({
        message: 'No se pudo reconectar al servidor',
        code: 'RECONNECT_FAILED'
      });
    };

    const handleConnectError = (error: any) => {
      updateConnectionStatus();
      handleError({
        message: error.message || 'Error de conexión',
        code: 'CONNECT_ERROR',
        details: error
      });
    };

    const handleSocketError = (error: SocketError) => {
      updateConnectionStatus();
      handleError(error);
    };

    // Suscribirse a eventos
    kanbanSocket.on('connect', handleConnect);
    kanbanSocket.on('disconnect', handleDisconnect);
    kanbanSocket.on('reconnect_attempt', handleReconnectAttempt);
    kanbanSocket.on('reconnect', handleReconnect);
    kanbanSocket.on('reconnect_failed', handleReconnectFailed);
    kanbanSocket.on('connect_error', handleConnectError);
    kanbanSocket.on('error', handleSocketError);

    // Actualizar estado inicial
    updateConnectionStatus();

    // Cleanup
    return () => {
      kanbanSocket.off('connect', handleConnect);
      kanbanSocket.off('disconnect', handleDisconnect);
      kanbanSocket.off('reconnect_attempt', handleReconnectAttempt);
      kanbanSocket.off('reconnect', handleReconnect);
      kanbanSocket.off('reconnect_failed', handleReconnectFailed);
      kanbanSocket.off('connect_error', handleConnectError);
      kanbanSocket.off('error', handleSocketError);
    };
  }, [updateConnectionStatus, handleError, clearError]);

  return {
    isConnected,
    isReconnecting,
    reconnectAttempts,
    hasError,
    error,
    reconnect,
    clearError,
  };
}; 