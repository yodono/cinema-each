import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/pontos/produtos-resgatados')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/pontos/produtos-resgatados"!</div>
}
