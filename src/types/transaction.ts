export interface dataTransaction {
    id: number;
    name: string;
    totalPay: number;
    totalPrice: number;
    status: status ;
    detail: detailTransaction[]
    createAt: string
}

export type status = "belum_lunas" | "lunas"; 

export interface detailTransaction {
    id: number;
    idItem: number;
    totalItem: number;
    totalPrice: number;
}