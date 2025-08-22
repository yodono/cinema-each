import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cake from "./features/cake/components/Cake/Cake";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Cake />
    </QueryClientProvider>
  );
}

export default App;
