import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input
} from "@/components/lib"

export function CurrencyConverter() {
  return (
    <>
        <div className="flex gap-4 mb-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="From" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">GBP</SelectItem>
          <SelectItem value="dark">EUR</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="To" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">GBP</SelectItem>
          <SelectItem value="dark">EUR</SelectItem>
        </SelectContent>
      </Select>
      </div>
      <div className="flex gap-4 mb-4">
      <Input placeholder="Amount" className="w-[180px]" />
      <Input placeholder="Converted Amount" className="w-[180px]" />
      </div>
    </>
  )
}

export default CurrencyConverter