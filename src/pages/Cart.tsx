import CartItem from "@/components/e-commerce/CartItem/CartItem";
import Loading from "@/components/feedback/loading/Loading";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import getCartProducts from "@/store/actions/getCartProducts";
import { ShoppingCart, ArrowLeft, Tag, PackageX } from "lucide-react";
import { Link } from "react-router-dom";
import { changeQuantity, removeFromCart } from "@/store/cart/cartSlice";  

/* ─── Skeleton for a single cart row ───────────────────────────────────── */
const CartItemSkeleton = () => (
  <div className="flex items-center gap-4 p-4 sm:p-5 bg-gray-900/50 border border-gray-800/60 rounded-2xl animate-pulse">
    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-800 shrink-0" />
    <div className="flex-1 space-y-2.5">
      <div className="h-3 w-16 bg-gray-800 rounded-full" />
      <div className="h-4 w-2/3 bg-gray-800 rounded-full" />
      <div className="h-3 w-1/3 bg-gray-800 rounded-full" />
    </div>
    <div className="flex items-center gap-3 shrink-0">
      <div className="w-24 h-9 bg-gray-800 rounded-xl" />
      <div className="w-16 h-6 bg-gray-800 rounded-full" />
      <div className="w-8 h-8 bg-gray-800 rounded-xl" />
    </div>
  </div>
);

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cartItems, productInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  const cartCount = Object.keys(cartItems).length;

  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch, cartItems]);

  const handleChangeQuantity = (id: number, quantity: number) => {
    dispatch(changeQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart({ id }));
  };

  /* ─── Order totals ─────────────────────────────────────────────────── */
  const { subtotal, totalSavings } = useMemo(() => {
    let subtotal = 0;
    let totalSavings = 0;

    productInfo.forEach((product) => {
      const qty = cartItems[product.id] ?? 0;
      const price = parseFloat(product.price);
      const saving = product.discount > 0 ? (price * product.discount) / 100 : 0;
      const finalPrice = price - saving;
      subtotal += finalPrice * qty;
      totalSavings += saving * qty;
    });

    return { subtotal, totalSavings };
  }, [productInfo, cartItems]);

  const skeleton = (
    <div className="space-y-3">
      {Array.from({ length: cartCount || 2 }).map((_, i) => (
        <CartItemSkeleton key={i} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ── Page Header ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/products"
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/80 transition-all duration-200 active:scale-95"
            aria-label="Back to shop"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                Shopping Cart
              </h1>
              <p className="text-xs text-gray-500">
                {cartCount === 0
                  ? "No items yet"
                  : `${cartCount} ${cartCount === 1 ? "item" : "items"} in your cart`}
              </p>
            </div>
          </div>
        </div>

        {/* ── Empty State ──────────────────────────────────────────────── */}
        {cartCount === 0 && (
          <div className="flex flex-col items-center justify-center py-28 gap-5 text-center">
            <div className="p-6 bg-gray-900/60 border border-gray-800 rounded-3xl">
              <PackageX className="w-14 h-14 text-gray-700" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-semibold text-gray-300">
                Your cart is empty
              </h2>
              <p className="text-sm text-gray-600 max-w-xs">
                Looks like you haven't added anything yet. Start browsing and
                find something you love!
              </p>
            </div>
            <Link
              to="/products"
              className="mt-1 inline-flex items-center gap-2 px-7 py-3 bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              Browse Products
            </Link>
          </div>
        )}

        {/* ── Main content (items + summary) ───────────────────────────── */}
        {cartCount > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* ─── Cart Items List ──────────────────────────────────── */}
            <div className="lg:col-span-2">
              <Loading loading={loading} error={error} skeleton={skeleton}>
                <div className="space-y-3">
                  {productInfo.map((product) => (
                    <CartItem
                      key={product.id}
                      product={product}
                      quantity={cartItems[product.id] ?? 1}
                      changeQuantity={handleChangeQuantity}
                      removeItem={handleRemoveItem}
                    />
                  ))}
                </div>
              </Loading>
            </div>

            {/* ─── Order Summary Panel ──────────────────────────────── */}
            <div className="lg:col-span-1 sticky top-6">
              <div className="bg-gray-900/60 border border-gray-800/80 rounded-2xl overflow-hidden shadow-2xl">

                {/* Panel header */}
                <div className="px-5 py-4 border-b border-gray-800/60">
                  <h2 className="font-bold text-white text-base">
                    Order Summary
                  </h2>
                </div>

                {/* Breakdown rows */}
                <div className="px-5 py-5 space-y-3 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>
                      Subtotal ({cartCount}{" "}
                      {cartCount === 1 ? "item" : "items"})
                    </span>
                    <span className="font-semibold text-gray-200">
                      ${(subtotal + totalSavings).toFixed(2)}
                    </span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        Discount savings
                      </span>
                      <span className="font-semibold">
                        -${totalSavings.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-500 text-xs">
                    <span>Shipping</span>
                    <span className="text-emerald-400 font-medium">Free</span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-800/80 pt-3 mt-1">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-300 font-semibold">Total</span>
                      <div className="text-right">
                        <p className="text-2xl font-extrabold text-cyan-400 leading-none">
                          ${subtotal.toFixed(2)}
                        </p>
                        {totalSavings > 0 && (
                          <p className="text-[11px] text-emerald-500 mt-1">
                            You save ${totalSavings.toFixed(2)}!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-5 pb-5">
                  <button
                    type="button"
                    className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20 text-sm tracking-wide"
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    to="/"
                    className="block mt-3 text-center text-xs text-gray-500 hover:text-cyan-400 transition-colors"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
