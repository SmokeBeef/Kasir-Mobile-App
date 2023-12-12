export type cart = {
  items: cartItem[];
  totalPrice: number;
};

export type cartItem = {
  id: number;
  name: string;
  price: number;
  total: number;
};
