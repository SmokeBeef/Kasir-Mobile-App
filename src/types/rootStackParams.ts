import { cart } from "./cart";

export type rootStackParamList = {
  login: undefined;
  main: undefined;
  detail: {
    id: number
  };
  pembayaran: {
    data: cart
  };
};

export type rootStackDrawerList = {
  dashboard: undefined;
  transaction: undefined;
}