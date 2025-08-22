import { Button } from "@/components/ui/button";
import { useQueryCake } from "../../api/useQueryCake";
import { useState } from "react";

function Cake() {
  const query = useQueryCake();
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((c) => c + 1);
  };

  return (
    <div>
      <h1 className="font-bold underline">
        {query.data?.name ? `${query.data?.name} (${count})` : "Sem bolo :("}
      </h1>
      <Button onClick={increment}>+ Bolo</Button>
    </div>
  );
}

export default Cake;
