import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Product from "@/components/e-commerce/products/Product";
import { useEffect } from "react";
import getProducts from "@/store/actions/getProducts";
import { useParams } from "react-router-dom";
import { productsCleanUp } from "@/store/products/productsSlice";
import Loading from "@/components/feedback/loading/Loading";
import GridList from "@/components/common/GridList/GridList";

const productSkeleton = (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-7">
    {Array.from({ length: 8 }).map((_, idx) => (
      <div
        key={idx}
        className="flex flex-col bg-gray-900/30 border border-gray-800/80 rounded-2xl overflow-hidden p-5 space-y-4 animate-pulse"
      >
        <div className="aspect-square w-full bg-gray-800/60 rounded-xl" />
        <div className="space-y-2.5">
          <div className="h-3 w-16 bg-gray-800/60 rounded" />
          <div className="h-5 w-3/4 bg-gray-800/60 rounded" />
          <div className="h-3.5 w-full bg-gray-800/60 rounded" />
          <div className="h-3.5 w-5/6 bg-gray-800/60 rounded" />
        </div>
        <div className="flex items-center justify-between pt-4 mt-auto">
          <div className="h-6 w-20 bg-gray-800/60 rounded" />
          <div className="h-10 w-10 bg-gray-800/60 rounded-xl" />
        </div>
      </div>
    ))}
  </div>
);

const Products = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const { prefix } = useParams();

  useEffect(() => {
    const promise = dispatch(getProducts(prefix));

    return () => {
      promise.abort();
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);

  return (
    <div className="mx-5 my-6 space-y-6">
      {/* Header Title */}
      <div className="text-left space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white capitalize">
          {prefix ? `${prefix} Products` : "All Products"}
        </h1>
        <p className="text-sm text-gray-400">
          Explore our curated selection of high-quality items.
        </p>
      </div>

      <Loading loading={loading} error={error} skeleton={productSkeleton}>
        {records?.length === 0 ? (
          <div className="py-16 text-center text-gray-400 bg-gray-900/20 border border-gray-800/80 rounded-2xl">
            <p className="text-lg font-semibold text-gray-300">
              No products found
            </p>
            <p className="text-sm text-gray-500 mt-1">
              There are no items available in this collection.
            </p>
          </div>
        ) : (
          <GridList
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-7"
            records={records}
            renderItems={(record) => (
              <Product product={record} />
            )}
          />
        )}
      </Loading>
    </div>
  );
};

export default Products;
