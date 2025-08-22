import { useQueryCake } from "../../api/useQueryCake";

function Cake() {
  const query = useQueryCake();

  return (
    <h1 className="font-bold underline">{query.data?.name ?? "Sem bolo :("}</h1>
  );
}

export default Cake;
