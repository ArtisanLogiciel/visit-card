import SignUpUser from "@/components/unAuthentifiedUser/signUp/SignUpUser";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


vi.mock("@/components/unAuthentifiedUser/signUp/FormSignUp", () => {
  const MockedComponent = () => <div>mocked component</div>;
  return { default: MockedComponent };
});

describe("signup user component", () => {
  beforeEach(() => {
    render(
    <BrowserRouter>
    <SignUpUser />
    </BrowserRouter>
    );
  });
  it("should mock component SignupUser ", () => {
    const mockedComponent = screen.getByText("mocked component");
    expect(mockedComponent).toBeInTheDocument();
  });
  it("should contains paragraph with 'Vous êtes déjà inscrit ?'",() => {
    const text = screen.getByText("Vous êtes déjà inscrit ?")
    expect(text).toBeInTheDocument()
  }
  )
  it("should contains h1 with 'Créons votre compte'", () => {
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeInTheDocument();
  });
  it("Link should redirect to  login Page",() => {
    const link = screen.getByRole("link", {name:/Se connecter/i})
    expect(link).toHaveAttribute("href","/login")
  }
  )
});
