import TestUseQuery from "@/components/TestUseQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import * as utils from "../../../utils/ToDelete";


describe("TestUseQuery", () => {
  it("affiche les données utilisateur", async () => {
    // vi.mock("../../../utils/toDelete", () => ({
    //   getUserOne: vi.fn().mockResolvedValue({ firstName: "Jean" }),
    // }));
    const user = {firstName:"Jean"}
    vi.spyOn(utils,"getUserOne").mockResolvedValue(user.firstName)
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
        },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <TestUseQuery userId={1} />
      </QueryClientProvider>
    );

  
  
    const firstNameDisplay = await screen.findByText(user.firstName);
    expect(firstNameDisplay).toBeInTheDocument();
    vi.restoreAllMocks();
  });
});
