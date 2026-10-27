import { memo, useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { getTotalQuantity } from "@/store/selectors";
import { Link } from "react-router-dom";

const HeaderCart = memo(() => {
  const count = useAppSelector(getTotalQuantity);
  const [isPumping, setIsPumping] = useState(false);

  useEffect(() => {
    if (count === 0) return;
    setIsPumping(true);

    const timer = setTimeout(() => {
      setIsPumping(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div
      className={`relative group transition-transform duration-300 ease-out ${
        isPumping ? "scale-125" : "scale-100"
      }`}
    >
      <Link to="/cart">
      <ShoppingCart
        className={`w-7 h-7 text-cyan-600 cursor-pointer transition-colors duration-200 ${
          isPumping ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" : ""
        }`}
      />{" "}
      <span
        className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full cursor-pointer font-semibold transition-all duration-300 ${
          isPumping ? "scale-110 shadow-lg shadow-red-500/60 ring-2 ring-red-400/50" : ""
        }`}
      >
        {count}
      </span>
      </Link>
    </div>
  );
});

export default HeaderCart;