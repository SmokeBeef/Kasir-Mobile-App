// base Response
export type baseResponse<data> = {
  success: boolean;
  message: string;
  code: number;
  data: data;
};

export type baseResponsePaginaton<data> = {
  success: boolean;
  message: string;
  code: number;
  data: data;
  pagination: pagination;
};

// pagination
type pagination = {
  page: number;
  perpage: number;
  totalPage: number;
  totalData: number;
  nextVisible: boolean;
};

// auth response
export type loginResponse = {
  success: boolean;
  data: {
    token: string;
    id: number;
    name: string;
    username: string;
    image: string;
    created_at: string;
    expires: number;
  };
  message: string;
  code: number;
};
export type refreshTokenResponse = {
  success: boolean;
  data: {
    token: string;
    expires: number;
  };
  message: string;
  code: number;
};

// menu
export type menu = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  type: string;
  created_at: string;
};

export type menuResponse = baseResponsePaginaton<menu[]>;

export type transaksi = {
  id: number;
  resi: string;
  nama_pelanggan: string;
  status: string;
  tgl_transaksi: string;
  nama_kasir: string;
  nomor_meja: string;
  total_harga: number;
  DetailTransaksi: detail[];
};

// pemesanan
export type pemesanan = {
  id: number;
  customer_name: string;
  total: number;
  user_id: number;
  user_name: string;
  total_payment: number;
  created_at: string;
};
type detailPemesanan = {
  id: number;
  menu_id: number;
  pemesanan_id: number;
  menu_name: string;
  qty: number;
  total: number;
};
export type pemesananDetail = {
  id: number;
  customer_name: string;
  total: number;
  user_id: number;
  user_name: string;
  total_payment: number;
  created_at: string;
  detailPemesanan: detailPemesanan[];
};

/// pemesanan by id
type Menu = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  type: string;
  created_at: string;
};

type DetailPemesanan = {
  id: number;
  menu_id: number;
  pemesanan_id: number;
  menu_name: string;
  qty: number;
  total: number;
  menu: Menu;
};

type User = {
  id: number;
  name: string;
  username: string;
  password: string;
  image: string;
  created_at: string;
};

export type PemesananById = {
  id: number;
  customer_name: string;
  total: number;
  user_id: number;
  user_name: string;
  total_payment: number;
  created_at: string;
  user: User;
  detailPemesanan: DetailPemesanan[];
};

export type pemesananGetAllResponse = baseResponsePaginaton<pemesananDetail[]>;
export type pemesananCreateResponse = baseResponse<pemesanan>;
export type pemesananByIdResponse = baseResponse<PemesananById>;

type detail = {
  harga: number;
  jumlah: number;
  nama_menu: string;
};

export type transaksiResponse = baseResponse<transaksi>;
