import type { Currency, CurrencyResponse } from "./CurrencyConverter.types";

export const convertAmount = async (
    amount: number,
    from: string,
    to: string
): Promise<number> => {
    const response = await fetch(
        `https://api.currencybeacon.com/v1/convert?api_key=WrpNSkWSHysvhrtAParCj0f49dOkFT61&amount=${amount}&from=${from}&to=${to}`
    );
    const data = await response.json();
    return data.response.value;
};

export const getCurrencies = async (): Promise<Currency[]> => {
    const response = await fetch(
        "https://api.currencybeacon.com/v1/currencies?api_key=WrpNSkWSHysvhrtAParCj0f49dOkFT61&type=fiat"
    );
    const data = (await response.json()) as CurrencyResponse;
    return data.response;
};