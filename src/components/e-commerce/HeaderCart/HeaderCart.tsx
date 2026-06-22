import { ShoppingCart } from "lucide-react";



const HeaderCart = () => {
  return (
    <div className="relative group">
      <ShoppingCart className="w-7 h-7 text-cyan-600 cursor-pointer" />{" "}
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full cursor-pointer font-semibold">3</span>
    </div>
  );
};

export default HeaderCart;