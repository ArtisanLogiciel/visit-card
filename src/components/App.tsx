import CardApp from "./CardApp";
import UserProvider from "../Providers/usersProviders";

function App() {
  return (
    <UserProvider>
      <CardApp />
    </UserProvider>
  );
}

export default App;
