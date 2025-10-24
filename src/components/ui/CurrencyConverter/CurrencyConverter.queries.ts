import type { Currency, CurrencyResponse } from "./CurrencyConverter.types";

const API_KEY = import.meta.env.CURRENCY_API_KEY || "WrpNSkWSHysvhrtAParCj0f49dOkFT61"; // Old api key for testing and fallback

export const convertAmount = async (
    amount: number,
    from: string,
    to: string
): Promise<number> => {
    const response = await fetch(
        `https://api.currencybeacon.com/v1/convert?api_key=${API_KEY}&amount=${amount}&from=${from}&to=${to}`
    );
    const data = await response.json();
    return data.response.value;
};

export const getCurrencies = async (): Promise<Currency[]> => {
    const response = await fetch(
        `https://api.currencybeacon.com/v1/currencies?api_key=${API_KEY}&type=fiat`
    );
    const data = (await response.json()) as CurrencyResponse;
    return data.response;
};