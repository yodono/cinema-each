import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/filmes/genero-por-diretor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/filmes/genero-por-diretor"!</div>
}
