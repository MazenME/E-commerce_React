import type { TCategory, TLoadingStatus, TProduct } from "@/types/types";

export interface IInitialState {
  records: TCategory[];
  loading: TLoadingStatus;
  error: string | null;
}

export interface IProductsInitialState {
  records: TProduct[];
  loading: TLoadingStatus;
  error: string | null;
}


export interface ICartInitialState {
  cartItems: { [id: number]: number };
  productInfo: TProduct[];
  loading: TLoadingStatus;
  error: string | null;
}

export interface ICartItemProps {
  product: TProduct;
  quantity: number;
  changeQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}