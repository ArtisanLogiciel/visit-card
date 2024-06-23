import Home from "@/components/unAuthentifiedUser/home/Home";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Home", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });
  it("should contains a banner", () => {
    const banner = screen.getByTestId("banner");

    expect(banner).toBeInTheDocument();
  });
  it("should contains two Smartphones components", () => {
    const smartphones = screen.getAllByTestId("smartphone");
    expect(smartphones).toHaveLength(2);
  });
  it("should calls CallToAction components", () => {
    const callToAction = screen.getByTestId("call-to-action");
    expect(callToAction).toBeInTheDocument();
  });
  it("shoud calls CardVisitShare", () => {
    const cardVisitShare = screen.getByTestId("card-visit-share");
    expect(cardVisitShare).toBeInTheDocument();
  });

  it("should calls CardVisitInterface", () => {
    const cardVisitInterface = screen.getByTestId("card-visit-interface");
    expect(cardVisitInterface).toBeInTheDocument();
  });
});
