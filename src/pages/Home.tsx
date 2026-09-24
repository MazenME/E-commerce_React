import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  ShieldCheck,
  Headphones,
  RotateCcw,
  Star,
  ArrowRight,
  ShoppingCart,
  Flame,
  TrendingUp,
  Tag,
  Sparkles,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import getCategories from "@/store/actions/getCategories";
import Category from "@/components/e-commerce/Categories/Category";

const BEST_SELLERS = [
  {
    id: 1,
    title: "Quantum Wireless Headphones",
    price: 199.99,
    rating: 5,
    reviews: 128,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    badge: "Hot",
  },
  {
    id: 2,
    title: "Aegis Smartwatch Series X",
    price: 249.5,
    rating: 4,
    reviews: 84,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
    badge: "Trending",
  },
  {
    id: 3,
    title: "Apex Mechanical Gaming Keyboard",
    price: 129.99,
    rating: 5,
    reviews: 210,
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
    badge: "Sale",
  },
  {
    id: 4,
    title: "Nomad Ergonomic Backpack",
    price: 89.99,
    rating: 4,
    reviews: 43,
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
    badge: null,
  },
];

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { records: categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    const promise =
      categories.length === 0 && categoriesLoading === "idle"
        ? dispatch(getCategories())
        : null;

    return () => {
      promise?.abort();
    };
  }, [dispatch, categories.length, categoriesLoading]);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 border border-gray-800 rounded-b-3xl p-8 md:p-16 shadow-2xl mx-5 mt-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="relative grid md:grid-cols-12 gap-12 items-center ">
          <div className="md:col-span-7 space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 bg-cyan-950/60 border border-cyan-800/40 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400 backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 fill-cyan-400 animate-pulse" />
              The Future of E-Commerce is Here
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Discover the <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
                Next Generation
              </span>{" "}
              <br />
              of Shopping
            </h1>
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Explore premium high-tech gadgets, fashion items, accessories, and
              more with our curated collections designed for modern lifestyles.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4 w-full">
              <Link
                to="/products"
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 active:from-cyan-700 active:to-cyan-600 text-white font-semibold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-cyan-500/15 cursor-pointer hover:scale-[1.03] duration-300"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/categories"
                className="bg-gray-800/80 hover:bg-gray-700/80 active:bg-gray-900/80 text-gray-200 border border-gray-700/60 font-semibold py-3.5 px-8 rounded-xl transition-all cursor-pointer hover:scale-[1.03] backdrop-blur-md duration-300"
              >
                Explore Categories
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <img
                src="/hero_banner.png"
                alt="Featured Gadgets"
                className="relative rounded-2xl border border-gray-800 object-cover w-full max-w-sm md:max-w-md shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-5">
        {[
          {
            icon: Truck,
            title: "Free Worldwide Delivery",
            desc: "On all orders above $100",
          },
          {
            icon: ShieldCheck,
            title: "100% Secure Checkout",
            desc: "Your transaction details are safe",
          },
          {
            icon: Headphones,
            title: "24/7 Dedicated Support",
            desc: "Get helpful query support instantly",
          },
          {
            icon: RotateCcw,
            title: "30-Day Risk-Free Returns",
            desc: "Worry-free exchange & refund policy",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-6 bg-gray-900/40 hover:bg-gray-900/70 border border-gray-800/80 hover:border-cyan-500/20 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-950/5 group"
          >
            <div className="p-3 bg-cyan-950/60 border border-cyan-900/30 rounded-xl text-cyan-400 transition-colors group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-400 duration-300">
              <item.icon className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-200 transition-colors group-hover:text-cyan-400 duration-300">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Categories */}
      <section className="space-y-6 mx-5">
        <div className="flex justify-between items-end">
          <div className="text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-bold bg-cyan-950/50 border border-cyan-900/40 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 fill-cyan-950" />
              COLLECTIONS
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Featured Categories
            </h2>
          </div>
          <Link
            to="/categories"
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium transition-colors text-sm group"
          >
            All Categories{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {categoriesLoading === "pending" ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-3 text-gray-400">Loading categories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((record) => (
              <div
                key={record.id}
                className="bg-gray-900/30 hover:bg-gray-900/60 border border-gray-800 hover:border-cyan-500/30 rounded-2xl p-4 transition-all duration-300 shadow-xl hover:shadow-cyan-950/20 group hover:-translate-y-1"
              >
                <Category category={record} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Promo Offer Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-cyan-900 to-blue-900 border border-cyan-800/40 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6 mx-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-20 -mt-20"></div>
        <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-3 z-10 w-full md:w-auto">
          <div className="inline-flex items-center gap-1.5 text-xs text-cyan-100 font-bold bg-white/10 px-3 py-1 rounded-full">
            <Tag className="w-3.5 h-3.5" />
            LIMITED TIME OFFER
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Get 20% Off Your First Purchase
          </h2>
          <p className="text-cyan-200/80 text-sm md:text-base max-w-xl">
            Use the promo code{" "}
            <span className="font-mono bg-white/20 text-white px-2 py-0.5 rounded font-bold">
              FIRST20
            </span>{" "}
            at checkout. Applicable on all tech gadgets and fashion collections.
          </p>
        </div>
        <Link
          to="/products"
          className="bg-white hover:bg-gray-100 active:bg-gray-200 text-cyan-950 font-bold py-3.5 px-8 rounded-xl transition-all shadow-xl hover:scale-[1.03] whitespace-nowrap z-10 cursor-pointer"
        >
          Redeem Discount
        </Link>
      </section>

      {/* Best Sellers Section */}
      <section className="space-y-6 mx-5">
        <div className="flex justify-between items-end">
          <div className="text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-950/50 border border-amber-900/40 px-3 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              TOP DEMAND
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Best Sellers
            </h2>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium transition-colors text-sm group"
          >
            See All Products{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BEST_SELLERS.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-gray-900/50 hover:bg-gray-900 border border-gray-800/80 rounded-2xl overflow-hidden hover:border-gray-700/80 hover:-translate-y-1.5 transition-all duration-300 shadow-xl"
            >
              {product.badge && (
                <span className="absolute top-3.5 left-3.5 z-10 bg-cyan-600 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-lg">
                  {product.badge}
                </span>
              )}
              <div className="relative aspect-square overflow-hidden bg-gray-950/80">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col flex-1 p-5 text-left space-y-3">
                <h3 className="font-semibold text-gray-200 line-clamp-1 group-hover:text-cyan-400 transition-colors duration-200">
                  {product.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center text-yellow-400">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < product.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-extrabold text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="flex items-center justify-center p-2.5 bg-gray-800 hover:bg-cyan-500 text-cyan-400 hover:text-white rounded-xl transition-all shadow-md active:scale-95 cursor-pointer duration-300">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
