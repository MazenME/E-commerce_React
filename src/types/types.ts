export type TCategory = {
  id: number;
  title: string;
  prefix: string;
  img: string;
};

export type TResponseCategories = TCategory[];

export type TProduct = {
  id: number;
  title: string;
  price: string;
  cat_prefix: string;
  img: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  discount: number;
  brand: string;
  isNew: boolean;
  featured: boolean;
  quantity?: number;
};

export type TResponseProducts = TProduct[];

export type TLoadingStatus = "idle" | "pending" | "succeeded" | "rejected";
