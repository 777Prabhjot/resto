import Dish from "./Dish";

const Dishs = () => {
  const data = [
    {
      id: "1",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/zowhe608nhgm02f1cnso",
      name: "Canadian Pizza",
      description: "Pizzas, Pastas",
      price: 400,
    },
    {
      id: "2",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/9ad61f23b36a31a0a7a0fdf7c19e2eba",
      name: "Salad Bowl",
      description: "Healthy Food, Salads",
      price: 150,
    },
  ];

  return (
    <div className="p-10 flex flex-wrap justify-evenly">
      {data.map((item) => {
        return (
          <Dish
            key={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
            description={item.description}
          />
        );
      })}
    </div>
  );
};

export default Dishs;
