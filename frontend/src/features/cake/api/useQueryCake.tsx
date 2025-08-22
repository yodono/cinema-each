import { useQuery } from "@tanstack/react-query";
import { get } from "../../../api/api";

async function getCake() {
  return await get("/cake");
}

export function useQueryCake() {
  return useQuery({ queryKey: ["cake"], queryFn: getCake });
}
