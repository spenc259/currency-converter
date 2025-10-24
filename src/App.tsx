import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CurrencyConverter from "./components/ui/CurrencyConverter/CurrencyConverter";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-3xl font-bold underline mb-4">Currency Converter</h1>
      <CurrencyConverter />
    </QueryClientProvider>
  );
}

export default App;
