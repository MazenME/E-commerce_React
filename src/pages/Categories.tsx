import { useAppDispatch, useAppSelector } from "@/store/hooks";
import getCategories from "@/store/actions/getCategories";
import { useEffect } from "react";
import Category from "@/components/e-commerce/Categories/Category";
import Loading from "@/components/feedback/loading/Loading";
import GridList from "@/components/common/GridList/GridList";

const categorySkeleton = (
  <div className="flex items-center justify-center gap-5 flex-wrap my-7">
    {Array.from({ length: 6 }).map((_, idx) => (
      <div key={idx} className="flex flex-col items-center p-2 rounded-xl animate-pulse space-y-2">
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-800/60 rounded-full" />
        <div className="h-5 w-24 bg-gray-800/60 rounded" />
      </div>
    ))}
  </div>
);

const Categories = () => {
  const dispatch = useAppDispatch();
  const { error, loading, records } = useAppSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    const promise = !records.length && loading === "idle" ? dispatch(getCategories()) : null;

    return () => {
      promise?.abort();
    };
  }, [dispatch, records.length, loading]);

  return (
    <div className="mx-5 my-5">
      <Loading loading={loading} error={error} skeleton={categorySkeleton}>
        {records?.length === 0 ? (
          <div className="py-16 text-center text-gray-400 bg-gray-900/20 border border-gray-800/80 rounded-2xl">
            <p className="text-lg font-semibold text-gray-300">No categories found</p>
            <p className="text-sm text-gray-500 mt-1">There are no categories available at the moment.</p>
          </div>
        ) : (
            <GridList
            className="flex items-center justify-center gap-5 flex-wrap my-7"
            records={records} renderItems={(record) => <Category category={record} />} />

        )}
      </Loading>
    </div>
  );
};

export default Categories;
