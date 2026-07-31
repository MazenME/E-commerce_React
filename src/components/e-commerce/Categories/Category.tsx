import { memo } from "react";
import type { TCategory } from "@/types/types";
import { Link } from "react-router-dom";

const Category: React.FC<{ category: TCategory }> = memo(({ category }) => {
  const { title, prefix, img } = category;

  return (
    <Link to={`/products/${prefix}`} className="flex flex-col items-center p-2 rounded-xl  cursor-pointer hover:scale-105 transition-transform duration-200 ">
      <img
        src={img}
        alt={title}
        className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full mb-2"
      />
      <p className="text-lg font-semibold">{title}</p>
    </Link>
  );
});

export default Category;
