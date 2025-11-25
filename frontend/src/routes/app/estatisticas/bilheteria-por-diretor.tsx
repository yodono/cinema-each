import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/app/estatisticas/bilheteria-por-diretor',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/estatisticas/bilheteria-por-diretor"!</div>
}
