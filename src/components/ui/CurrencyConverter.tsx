import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input
} from "@/components/lib"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState<string>('GBP');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [inputAmount, setInputAmount] = useState<number>(0);
  const { data } = useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies
  });

  const { data: convertedAmount, refetch} = useQuery({
    queryKey: ['convertAmount', fromCurrency, toCurrency, inputAmount],
    queryFn: () => convertAmount(inputAmount, fromCurrency!, toCurrency!),
    enabled: false
  });

  const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value, toCurrency, fromCurrency);
    // setInputAmount(Number(value));
    if (value !== '' && toCurrency && fromCurrency) {
      convertAmount(Number(value), fromCurrency, toCurrency).then((converted) => {
        console.log('convertedAmount:',convertedAmount, converted)
        setInputAmount(converted);
      });
  }
}



  return (
    <>
        <div className="flex gap-4 mb-4">
      <Select onValueChange={(e) => setFromCurrency(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="From" />
        </SelectTrigger>
        <SelectContent>
          {/* <SelectItem value="light">GBP</SelectItem>
          <SelectItem value="dark">EUR</SelectItem> */}
          {data.map((currency: any) => (
            <SelectItem key={currency.short_code} value={currency.short_code}>
              {currency.short_code} - {currency.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(e) => setToCurrency(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="To" />
        </SelectTrigger>
        <SelectContent>
          {data.map((currency: Currency) => (
            <SelectItem key={currency.short_code} value={currency.short_code}>
              {currency.short_code} - {currency.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>
      <div className="flex gap-4 mb-4">
      <Input placeholder="Amount" className="w-[180px]" onChange={(e) => handleCurrencyInput(e)}/>
      <Input placeholder="Converted Amount" className="w-[180px]" value={inputAmount}/>
      </div>
    </>
  )
}

const convertAmount = async (amount: number, from: string, to: string): Promise<number> => {
  const response = await fetch(`https://api.currencybeacon.com/v1/convert?api_key=WrpNSkWSHysvhrtAParCj0f49dOkFT61&amount=${amount}&from=${from}&to=${to}`);
  const data = await response.json();
  console.log(data.response.value);
  return data.response.value;
  // return data.value;
}

const getCurrencies = async (): Promise<Currency[]> => {
  const response = await fetch('https://api.currencybeacon.com/v1/currencies?api_key=WrpNSkWSHysvhrtAParCj0f49dOkFT61');
  const data = await response.json();
  // console.log(await data.response);
  return data.response;
}

type Currency = {
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
}

export default CurrencyConverter