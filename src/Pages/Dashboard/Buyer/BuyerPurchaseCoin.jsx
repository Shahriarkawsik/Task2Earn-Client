import { Link } from "react-router-dom";

const BuyerPurchaseCoin = () => {
  const purchasecoinValue = [
    {
      coin: 10,
      coinValue: 1,
    },
    {
      coin: 150,
      coinValue: 10,
    },
    {
      coin: 500,
      coinValue: 20,
    },
    {
      coin: 1000,
      coinValue: 35,
    },
  ];
  return (
    <section className="my-5">
      {/* Purchase coin */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {purchasecoinValue.map((card, index) => (
          <div
            key={index}
            className="p-5 bg-amber-200 flex flex-col justify-center items-center space-y-3 text-3xl text-color3 font-Inter font-bold"
          >
            <p>{card.coin} coin</p>
            <p>=</p>
            <p>$ {card.coinValue}</p>
            <Link to={`/<pathName>/${index}`}>
              <button className="px-4 py-3 rounded-xl bg-amber-300 text-xl">
                Purchase
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuyerPurchaseCoin;
