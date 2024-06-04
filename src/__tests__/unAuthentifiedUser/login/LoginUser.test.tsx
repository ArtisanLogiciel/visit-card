import LoginUser from "@/components/unAuthentifiedUser/login/LoginUser";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

vi.mock("@/components/unAuthentifiedUser/login/FormLogin", () => {
  const ComponentToMock = () => <div>Mocked FormLogin</div>;

  return { default: ComponentToMock };
});
describe("LoginUser", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <LoginUser />
      </BrowserRouter>
    );
  });
  it("FormLogin should be mocked because it uses provider", () => {
    const mockedFormLoginText = screen.getByText("Mocked FormLogin");
    expect(mockedFormLoginText).toBeInTheDocument();
  });
  it('h1 shoud contains "Connectez-vous à votre compte"', () => {
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent("Connectez-vous à votre compte");
  });
  it("should contains a paragraph 'Vous n'avez pas de compte'", () => {
    const text = screen.getByText("Vous n'avez pas de compte");
    expect(text).toBeInTheDocument();
  });
  it("should contains a link redirecting to Signup Page", () => {
    const link = screen.getByRole("link", { name: "Créer un compte" });
    expect(link).toHaveAttribute("href", "/sign-up");
  });
});
