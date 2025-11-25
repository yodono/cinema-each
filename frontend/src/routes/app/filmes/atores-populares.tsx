import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/filmes/atores-populares')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/filmes/atores-populares"!</div>
}
