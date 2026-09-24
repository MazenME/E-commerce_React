import type { TLoadingStatus, TProduct } from "@/types/types";

export interface IInitialState {
  records: { id: number; title: string; prefix: string; img: string }[];
  loading: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
}

export interface IProductsInitialState {
  records: {
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
  }[];
  loading: "idle" | "pending" | "succeeded"  | "rejected";
  error: string | null;
}


export interface ICartInitialState {
  cartItems: { [id: number]: number };
  productInfo: TProduct[];
  loading: TLoadingStatus;
  error: string | null;
}
