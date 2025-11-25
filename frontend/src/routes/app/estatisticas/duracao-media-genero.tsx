import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/estatisticas/duracao-media-genero')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/estatisticas/duracaoGenero"!</div>
}
