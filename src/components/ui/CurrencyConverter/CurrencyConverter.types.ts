export type CurrencyResponse = {
    meta: { total: number };
    response: Currency[];
    [key: string]: Currency | Currency[] | { total: number };
};

export type Currency = {
    code: string;
    decimal_mark: string;
    id: number;
    name: string;
    precision: number;
    short_code: string;
    subunit: number;
    symbol: string;
    symbol_first: boolean;
    thousands_separator: string;
};