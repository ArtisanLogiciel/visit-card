import CardApp from "./CardApp";
import UserProvider from "../Providers/usersProviders";
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <CardApp />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
