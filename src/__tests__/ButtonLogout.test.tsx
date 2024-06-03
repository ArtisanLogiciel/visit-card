import { UserContext } from "@/Providers/usersProviders";
import ButtonLogout from "@/components/elements/ButtonLogout";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual: object = await importOriginal();
  console.log("actual", actual);
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("Logout Button", () => {
  beforeEach(() => {
  
  });
  it("should contains 'Déconnexion'", () => {
    const logoutUserMock = vi.fn();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <BrowserRouter>
        <UserContext.Provider
          value={{
            logoutUser: logoutUserMock,
            authUser: null,
            loginUser: vi.fn(),
            registerUser: vi.fn(),
            errorFirebaseUser: null,
          }}
        >
          {children}
        </UserContext.Provider>
      </BrowserRouter>
    );
    render(<ButtonLogout />, { wrapper });
    const buttonLogout = screen.getByRole("button", { name: "Déconnexion" });
    expect(buttonLogout).toBeInTheDocument();
  });
  it("should handle logout on click", async () => {
    const logoutUserMock = vi.fn();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <BrowserRouter>
        <UserContext.Provider
          value={{
            logoutUser: logoutUserMock,
            authUser: null,
            loginUser: vi.fn(),
            registerUser: vi.fn(),
            errorFirebaseUser: null,
          }}
        >
          {children}
        </UserContext.Provider>
      </BrowserRouter>
    );
    render(<ButtonLogout />, { wrapper });
 
    const user = userEvent.setup();
    const buttonLogout = screen.getByRole("button", { name: "Déconnexion" });
    await user.click(buttonLogout);

    expect(logoutUserMock).toHaveBeenCalledTimes(1);

    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });
});
