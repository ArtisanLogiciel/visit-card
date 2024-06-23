import PageNotFound from "@/components/PageNotFound";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("PageNotFound", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );
  });
  it("shoud contains title 'Vous êtes perdu ?'", () => {
    const title = screen.getByRole("heading", {
      level: 1,
      name: "Vous êtes perdu ?",
    });
    expect(title).toBeInTheDocument();
  });
  it("Should contains button 'Retour à l'accueil'", () => {
    const button = screen.getByRole("button", { name: "Retour à l'accueil" });
    expect(button).toBeInTheDocument();
  });
  it("link should redirect to home", () => {
    const link = screen.getByRole("link", { name: "Retour à l'accueil" });
    expect(link).toHaveAttribute("href", "/");
  });
});
