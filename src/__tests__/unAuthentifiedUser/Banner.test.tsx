import Banner from "@/components/unAuthentifiedUser/Banner";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Banner", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Banner />
      </BrowserRouter>
    );
  });
  it("should contains a header element", () => {
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });
  it("should contains 'Se connecter' link", () => {
    const linkLogin = screen.getByRole("link", {
      name: /Se connecter/i,
    });
    expect(linkLogin).toBeInTheDocument();
  });
  it("link should redirect to login page", () => {
    const linkLogin = screen.getByRole("link", { name: /Se connecter/i });
    expect(linkLogin).toHaveAttribute("href", "/login");
  });
});
