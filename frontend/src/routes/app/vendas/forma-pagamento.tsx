import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/vendas/forma-pagamento')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/vendas/forma-pagamento"!</div>
}
