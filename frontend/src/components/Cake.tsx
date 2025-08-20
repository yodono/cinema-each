import { useQuery } from "@tanstack/react-query";

async function getCake() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cake`);
  return res.json();
}

function Cake() {
  const query = useQuery({ queryKey: ["cake"], queryFn: getCake });

  return (
    <h1 className="font-bold underline">{query.data?.name ?? "Sem bolo :("}</h1>
  );
}

export default Cake;
