import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/estatisticas/bilheteria-por-genero')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/estatisticas/bilheteriaPorGenero"!</div>
}
