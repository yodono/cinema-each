import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/vendas/colecionaveis')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/vendas/colecionaveis/"!</div>
}
