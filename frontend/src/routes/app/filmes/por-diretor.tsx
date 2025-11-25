import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/filmes/por-diretor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/filmes/por-diretor"!</div>
}
