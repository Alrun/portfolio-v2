export interface TableState {
    columns: TableColumnInterface[];
    items: TableItemInterface[];
    sort: any;
    groupOpen: string[];
    pinned: string[];
    loading: boolean;
    error: string;
}

export interface TableColumnInterface {
    width: number;
    order: number;
    head: {
        id: string; // TODO Add nonEmptyString type
        title: string;
    }[];
    align?: 'start' | 'center' | 'end';
    resizable?: boolean;
    reorderable?: boolean;
    hidden?: boolean;
    fixed?: boolean;
}

export interface TableItemInterface {
    id: string;
    coin: string;
    title: string;
    symbol: string;
    quantity: number;
    value: number;
    price_buy: number;
    price_current: number;
    change: number;
    sold: number;
    quota: number;
    wallet: string;
    date: number;
    group?: {
        id: string;
        coin: string;
        title: string;
        symbol: string;
        quantity: number;
        value: number;
        price_buy: number;
        price_current: number;
        change: number;
        sold: number;
        quota: number;
        wallet: string;
        date: number;
    }[];
}

