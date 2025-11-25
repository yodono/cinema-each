import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/filmes/em-cartaz-genero')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/filmes/em-cartaz-genero"!</div>
}
