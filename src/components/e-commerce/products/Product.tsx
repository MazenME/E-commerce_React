import { memo } from "react";
import type { TProduct } from "@/types/types";
import { Star, ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/cart/cartSlice";

interface ProductProps {
  product: TProduct;
  onAddToCart?: (id: number) => void;
}

const Product = memo(({ product, onAddToCart }: ProductProps) => {
  const {
    id,
    title,
    price,
    img,
    description,
    rating,
    reviews,
    discount,
    brand,
    isNew,
    stock,
  } = product;

  const dispatch = useAppDispatch();
  const currentQuantity = useAppSelector((state) => state.cart.cartItems[id]);

  const handleButtonClick = () => {
    if (typeof onAddToCart === "function") {
      onAddToCart(id);
    } else {
      dispatch(addToCart({ id }));
    }
  };

  const isOutOfStock = currentQuantity >= stock;

  const numericPrice = parseFloat(price);
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount
    ? numericPrice - (numericPrice * discount) / 100
    : numericPrice;

  return (
    <div className="group relative flex flex-col bg-gray-900/40 hover:bg-gray-900/70 border border-gray-800 hover:border-cyan-500/30 rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 shadow-xl w-full">
      {/* Badges */}
      <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 items-start">
        {isNew && (
          <span className="bg-cyan-600 text-white text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full shadow-md">
            New
          </span>
        )}
        {hasDiscount && (
          <span className="bg-rose-500 text-white text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full shadow-md">
            -{discount}%
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-950/80">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 p-5 text-left space-y-2">
        {brand && (
          <span className="text-[10px] uppercase font-semibold text-cyan-400 tracking-wider">
            {brand}
          </span>
        )}

        <h3 className="font-bold text-gray-200 line-clamp-1 group-hover:text-cyan-400 transition-colors duration-200">
          {title}
        </h3>

        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs pt-1">
          <div className="flex items-center text-yellow-400">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={`w-3.5 h-3.5 ${
                  idx < Math.round(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-700"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-500">({reviews} reviews)</span>
        </div>

        {/* Price & Cart CTA */}
        <div className="flex items-center justify-between pt-3 mt-auto">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-xs text-gray-500 line-through">
                  ${numericPrice.toFixed(2)}
                </span>
                <span className="text-lg font-extrabold text-white">
                  ${discountedPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-extrabold text-white">
                ${numericPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            className={`flex items-center justify-center p-2.5 ${
              isOutOfStock
                ? "bg-gray-950 cursor-not-allowed opacity-50"
                : "bg-gray-800 hover:bg-cyan-500 text-cyan-400 hover:text-white rounded-xl transition-all shadow-md active:scale-95 cursor-pointer duration-300"
            }`}
            onClick={handleButtonClick}
            disabled={isOutOfStock} 
          >
            <ShoppingCart className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default Product;
