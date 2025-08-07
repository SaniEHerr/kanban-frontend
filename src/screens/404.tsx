import { Pathnames } from "@/routes/pathNames"
import { Link } from "react-router-dom"

import { Button } from "@/modules/core/ui/button"

export const NotFoundPage = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary underline">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Página no encontrada</p>
        <p className="text-gray-500 mt-2">Lo sentimos, la página que estás buscando no existe.</p>
        <Button asChild className="mt-4">
          <Link to={Pathnames.kanban.index}>Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}
export const Component = NotFoundPage
