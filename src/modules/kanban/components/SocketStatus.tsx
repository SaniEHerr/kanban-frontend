import { useSocketError } from '../hooks/useSocketError';
import { Wifi, WifiOff, RefreshCw, AlertCircle } from 'lucide-react';

export const SocketStatus = () => {
  const { isConnected, isReconnecting, reconnectAttempts, hasError, error, reconnect } = useSocketError();

  if (isConnected && !hasError) {
    return (
      <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
        <Wifi className="w-4 h-4" />
        <span className="text-sm font-medium">Conectado</span>
      </div>
    );
  }

  if (isReconnecting) {
    return (
      <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">
        <RefreshCw className="w-4 h-4 animate-spin" />
        <span className="text-sm font-medium">
          Reconectando... ({reconnectAttempts}/5)
        </span>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-3 py-1 rounded-full">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm font-medium">
          {error?.message || 'Error de conexión'}
        </span>
        <button
          onClick={reconnect}
          className="ml-2 text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
        >
          Reconectar
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-gray-400 bg-gray-400/10 px-3 py-1 rounded-full">
      <WifiOff className="w-4 h-4" />
      <span className="text-sm font-medium">Desconectado</span>
    </div>
  );
}; 