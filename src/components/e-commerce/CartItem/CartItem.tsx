import { memo } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import type { ICartItemProps } from "@/interfaces/interfaces";
import { getFinalPrice } from "@/utils/getFinalPrice";

const CartItem = memo(
  ({ product, quantity, changeQuantity, removeItem }: ICartItemProps) => {
    const { id, title, price, img, stock, brand, discount } = product;

    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    const hasDiscount = discount > 0;
    const finalPrice = getFinalPrice(price, discount);

    const itemTotal = (finalPrice * quantity).toFixed(2);
    const isMinQuantity = quantity <= 1;
    const isMaxQuantity = quantity >= stock;

    const handleIncrement = () => {
      if (!isMaxQuantity) {
        changeQuantity(id, quantity + 1);
      }
    };

    const handleDecrement = () => {
      if (!isMinQuantity) {
        changeQuantity(id, quantity - 1);
      }
    };

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 bg-gray-900/50 border border-gray-800/80 hover:border-gray-700/80 rounded-2xl transition-all duration-300 shadow-lg w-full">
        {/* Left: Product Image & Details */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative aspect-square w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-950 border border-gray-800 shrink-0">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col text-left space-y-1 min-w-0 flex-1">
            {brand && (
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                {brand}
              </span>
            )}
            <h3 className="font-bold text-gray-200 text-sm sm:text-base line-clamp-1">
              {title}
            </h3>

            {/* Price Per Unit */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-gray-400">Unit Price:</span>
              <span className="font-semibold text-white">
                ${finalPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-gray-500 line-through text-xs">
                  ${numericPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Limit Indicator */}
            {isMaxQuantity && (
              <span className="text-[11px] font-medium text-amber-400">
                Max available stock ({stock} pieces) reached
              </span>
            )}
          </div>
        </div>

        {/* Right: Quantity Stepper & Total */}
        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-800/60">
          {/* Quantity Controls */}
          <div className="flex items-center bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-inner">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={isMinQuantity}
              aria-label="Decrease quantity"
              className={`p-2 transition-colors ${
                isMinQuantity
                  ? "text-gray-600 cursor-not-allowed bg-gray-900/40"
                  : "text-gray-300 hover:text-white hover:bg-gray-800 active:scale-95 cursor-pointer"
              }`}
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-10 text-center font-bold text-white text-sm select-none">
              {quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrement}
              disabled={isMaxQuantity}
              aria-label="Increase quantity"
              className={`p-2 transition-colors ${
                isMaxQuantity
                  ? "text-gray-600 cursor-not-allowed bg-gray-900/40"
                  : "text-gray-300 hover:text-white hover:bg-gray-800 active:scale-95 cursor-pointer"
              }`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Subtotal */}
          <div className="flex flex-col text-right min-w-[5rem]">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
              Subtotal
            </span>
            <span className="text-base sm:text-lg font-extrabold text-cyan-400">
                ${itemTotal}
            </span>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => removeItem(id)}
            aria-label="Remove item from cart"
            className="p-2 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all active:scale-90 cursor-pointer"
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    );
  }
);

export default CartItem;
