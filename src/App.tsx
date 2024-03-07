import Todo from "pages/Todo";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient: QueryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
    </QueryClientProvider>
  );
}

export default App;
