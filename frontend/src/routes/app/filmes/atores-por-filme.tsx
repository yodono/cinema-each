import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/filmes/atores-por-filme')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/filmes/atores-por-filme"!</div>
}
