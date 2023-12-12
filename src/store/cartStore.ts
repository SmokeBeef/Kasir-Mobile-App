import { atom, selector } from "recoil";


interface item {
  id: number;
  name: string;
  price: number;
  total: number;
}

interface state {
  totalPrice: number;
  items: item[];
}

// interface valueSelector {
//   totalPrice: number;
//   items:
// }


export const cartState = atom({
  key: "cart",
  default: {
    items: [],
    totalPrice: 0
  } as state
})

