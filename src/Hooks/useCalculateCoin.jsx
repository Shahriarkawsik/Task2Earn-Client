import { useState } from "react";

const useCalculateCoin = () => {
  const [addCoin, setAddCoin] = useState(0);
  return [addCoin, setAddCoin];
};

export default useCalculateCoin;
