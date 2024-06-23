import ViewCardUserById from "@/components/AuthentifiedUser/ViewCardUserById";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("View user By Email", () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ViewCardUserById />
        </BrowserRouter>
      </QueryClientProvider>
    );
  });

  it.skip("should contains 'carte de visite' title", () => {
    const title = screen.getByText(/Carte de visite/i);
    screen.debug();
    expect(title).toBeInTheDocument();
  });
});
