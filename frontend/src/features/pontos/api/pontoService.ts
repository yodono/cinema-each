import { get } from "../../../api/api";
import { type ProdutosResgatados } from "../../../types/pontosTypes";

// RF28 - Produtos Resgatados
export async function getReceitaProdutosResgatados(): Promise<
  ProdutosResgatados[]
> {
  return await get("/pontos/produtos-resgatados");
}
