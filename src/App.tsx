import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { useEffect } from 'react';
import { kanbanSocket } from '@/socket';
import { Toaster } from "sonner";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  useEffect(() => {
    kanbanSocket.on("connect", () => {
      console.log("Conectado al backend con id:", kanbanSocket.id);
    });

    kanbanSocket.on("disconnect", () => {
      console.log("Desconectado del backend");
    });

    return () => {
      kanbanSocket.off("connect");
      kanbanSocket.off("disconnect");
    };
  }, []);
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </>
  )
}

export default App
