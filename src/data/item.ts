import { item } from "../types/data";
import { dataTransaction } from "../types/transaction";

export const itemData: item[] = [
  {
    id: 1,
    name: "geprek bensu",
    isAvaible: true,
    price: 10000,
    img: "https://dummyimage.com/600x400/000/ffffff&text=ini+gambar",
  },
  {
    id: 2,
    name: "kak rose",
    isAvaible: true,
    price: 10000,
    img: "https://dummyimage.com/600x400/000/ffffff&text=ini+gambar",
  },
  {
    id: 3,
    name: "tahu telor",
    isAvaible: true,
    price: 10000,
    img: "https://dummyimage.com/600x400/000/ffffff&text=ini+gambar",
  },
  {
    id: 4,
    name: "es kuburan",
    isAvaible: true,
    price: 10000,
    img: "https://dummyimage.com/600x400/000/ffffff&text=ini+gambar",
  },
  {
    id: 5,
    name: "gacoan",
    isAvaible: true,
    price: 10000,
    img: "https://dummyimage.com/600x400/000/ffffff&text=ini+gambar",
  },
];

export const dataWillAdd: dataTransaction[] = [
  {
    id: 1,
    name: 'Transaction 1',
    totalPay: 100,
    totalPrice: 150,
    status: "lunas",
    detail: [
      { id: 1, idItem: 101, totalItem: 2, totalPrice: 50 },
      { id: 2, idItem: 102, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-01-01T12:00:00Z',
  },
  {
    id: 2,
    name: 'Transaction 2',
    totalPay: 200,
    totalPrice: 250,
    status: "lunas",
    detail: [
      { id: 3, idItem: 103, totalItem: 3, totalPrice: 150 },
      { id: 4, idItem: 104, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-02-01T12:00:00Z',
  },
  {
    id: 3,
    name: 'Transaction 3',
    totalPay: 100,
    totalPrice: 150,
    status: "lunas",
    detail: [
      { id: 1, idItem: 101, totalItem: 2, totalPrice: 50 },
      { id: 2, idItem: 102, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-01-01T12:00:00Z',
  },
  {
    id: 4,
    name: 'Transaction 4',
    totalPay: 200,
    totalPrice: 250,
    status: "lunas",
    detail: [
      { id: 3, idItem: 103, totalItem: 3, totalPrice: 150 },
      { id: 4, idItem: 104, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-02-01T12:00:00Z',
  },
  {
    id: 5,
    name: 'Transaction 5',
    totalPay: 100,
    totalPrice: 150,
    status: "lunas",
    detail: [
      { id: 1, idItem: 101, totalItem: 2, totalPrice: 50 },
      { id: 2, idItem: 102, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-01-01T12:00:00Z',
  },
  {
    id: 6,
    name: 'Transaction 6',
    totalPay: 200,
    totalPrice: 250,
    status: "lunas",
    detail: [
      { id: 3, idItem: 103, totalItem: 3, totalPrice: 150 },
      { id: 4, idItem: 104, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-02-01T12:00:00Z',
  },
  {
    id: 7,
    name: 'Transaction 7',
    totalPay: 100,
    totalPrice: 150,
    status: "lunas",
    detail: [
      { id: 1, idItem: 101, totalItem: 2, totalPrice: 50 },
      { id: 2, idItem: 102, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-01-01T12:00:00Z',
  },
  {
    id: 8,
    name: 'Transaction 8',
    totalPay: 200,
    totalPrice: 250,
    status: "lunas",
    detail: [
      { id: 3, idItem: 103, totalItem: 3, totalPrice: 150 },
      { id: 4, idItem: 104, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-02-01T12:00:00Z',
  },
]

export const dataTransaksi: dataTransaction[] = [
  {
    id: 1,
    name: 'Transaction 1',
    totalPay: 100,
    totalPrice: 150,
    status: "lunas",
    detail: [
      { id: 1, idItem: 101, totalItem: 2, totalPrice: 50 },
      { id: 2, idItem: 102, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-01-01T12:00:00Z',
  },
  {
    id: 2,
    name: 'Transaction 2',
    totalPay: 200,
    totalPrice: 250,
    status: "lunas",
    detail: [
      { id: 3, idItem: 103, totalItem: 3, totalPrice: 150 },
      { id: 4, idItem: 104, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-02-01T12:00:00Z',
  },
  {
    id: 3,
    name: 'Transaction 3',
    totalPay: 100,
    totalPrice: 150,
    status: "lunas",
    detail: [
      { id: 1, idItem: 101, totalItem: 2, totalPrice: 50 },
      { id: 2, idItem: 102, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-01-01T12:00:00Z',
  },
  {
    id: 4,
    name: 'Transaction 4',
    totalPay: 200,
    totalPrice: 250,
    status: "lunas",
    detail: [
      { id: 3, idItem: 103, totalItem: 3, totalPrice: 150 },
      { id: 4, idItem: 104, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-02-01T12:00:00Z',
  },
  {
    id: 5,
    name: 'Transaction 5',
    totalPay: 100,
    totalPrice: 150,
    status: "lunas",
    detail: [
      { id: 1, idItem: 101, totalItem: 2, totalPrice: 50 },
      { id: 2, idItem: 102, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-01-01T12:00:00Z',
  },
  {
    id: 6,
    name: 'Transaction 6',
    totalPay: 200,
    totalPrice: 250,
    status: "lunas",
    detail: [
      { id: 3, idItem: 103, totalItem: 3, totalPrice: 150 },
      { id: 4, idItem: 104, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-02-01T12:00:00Z',
  },
  {
    id: 7,
    name: 'Transaction 7',
    totalPay: 100,
    totalPrice: 150,
    status: "lunas",
    detail: [
      { id: 1, idItem: 101, totalItem: 2, totalPrice: 50 },
      { id: 2, idItem: 102, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-01-01T12:00:00Z',
  },
  {
    id: 8,
    name: 'Transaction 8',
    totalPay: 200,
    totalPrice: 250,
    status: "lunas",
    detail: [
      { id: 3, idItem: 103, totalItem: 3, totalPrice: 150 },
      { id: 4, idItem: 104, totalItem: 1, totalPrice: 100 },
    ],
    createAt: '2023-02-01T12:00:00Z',
  },
]