import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/vendas/snacks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/vendas/snacks"!</div>
}
