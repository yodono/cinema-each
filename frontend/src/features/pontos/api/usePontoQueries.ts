import { useQuery } from "@tanstack/react-query";
import {
  getReceitaProdutosResgatados,
} from "./pontoService";


// RF28 - Produtos Resgatados
export function useQueryPontosProdutosResgatados() {
  return useQuery({
    queryKey: ["pontos", "produtos-resgatados"],
    queryFn: getReceitaProdutosResgatados,
  });
}
