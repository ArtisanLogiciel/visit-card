import UserContextProvider from "@/Providers/usersProviders";
import FormLogin from "@/components/unAuthentifiedUser/login/FormLogin";
import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

//TODO:tester avec une saisie de  user
// const fakeEmail = "test@test.fr";
// const fakePassword = "password";
// const fakeShortPassword = "a";

vi.mock("react-router-dom", async (importOriginal:()=>object) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("FormLogin", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <UserContextProvider>
          <FormLogin />
        </UserContextProvider>
      </BrowserRouter>
    );
  });
  it("inputs for email and password , submit button should be present in the document", async () => {
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    const emailInput = screen.getByLabelText(/mail/i);
    const submitButton = screen.getByRole("button", { name: /Connexion/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  // it("handleLogin function should be call on submit form ", async () => {
  //   const passwordInput = screen.getByLabelText(/Mot de passe/i);
  //   const emailInput = screen.getByLabelText(/mail/i);
  //   const submitButton = screen.getByRole("button", { name: /Connexion/i });

  //   const handleLogin = vi.fn();
  //   const mockNavigate = vi.fn();
  //   vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  //   const user = userEvent.setup();
  //   await user.type(emailInput, fakeEmail);
  //   await user.type(passwordInput, fakePassword);
  //   await user.click(submitButton);
  //   expect(handleLogin).toHaveBeenCalled();
  // });
});
