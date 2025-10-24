import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
} from "@/components/lib";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import type { Currency } from "./CurrencyConverter.types";
import { convertAmount, getCurrencies } from "./CurrencyConverter.queries";

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState<string>("GBP");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [debouncedInputAmount] = useDebounce(inputAmount, 500);

  const { data, isPending, isError } = useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });

  const { data: convertedAmount } = useQuery({
    queryKey: ["convertAmount", fromCurrency, toCurrency, debouncedInputAmount],
    queryFn: () =>
      convertAmount(debouncedInputAmount, fromCurrency!, toCurrency!),
    enabled: !!fromCurrency && !!toCurrency && debouncedInputAmount > 0,
  });

  const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputAmount(Number(value));
  };

  if (isError) {
    return <div>Error converting currency.</div>;
  }

  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex gap-4 mb-4">
        <Select onValueChange={(e) => setFromCurrency(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="From" />
          </SelectTrigger>
          <SelectContent>
            {data.map((currency: Currency) => (
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
        <Input
          placeholder="Amount"
          className="w-[180px]"
          onChange={(e) => handleCurrencyInput(e)}
          pattern="0-9"
          type="number"
        />
        <Input
          placeholder="Converted Amount"
          className="w-[180px]"
          value={convertedAmount ?? ""}
        />
      </div>
    </div>
  );
}

export default CurrencyConverter;
