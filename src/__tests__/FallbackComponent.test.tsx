import FallbackComponent from "@/components/FallbackComponent";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

const errorMessage = 'test Error'
const mockErrorBoundary = vi.fn()

describe("FallbackComponent", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <FallbackComponent
          error={new Error(errorMessage)}
          resetErrorBoundary={mockErrorBoundary}
        />
        ,{}
      </BrowserRouter>
    );
  });
  it("should contains 'Une erreur s'est produite' title", () => {
    const title = screen.getByRole("heading", {
      level: 1,
      name: "Une erreur s'est produite",
    });
    expect(title).toBeInTheDocument();
  });
  it("should display details error if the environement is DEV",() => {
    import.meta.env.DEV=true
    const errorDetail =  screen.getByText(`Détail de l'erreur :${errorMessage}`)
    expect(errorDetail).toBeInTheDocument()
  })
  it("should contains 'Retour à l'accueil' button",() => {
    const button = screen.getByRole("button",{name:"Retour à l'accueil"})
    expect(button).toBeInTheDocument()
  }
  )
  it("link should redirect to home",() => {
    const linkElement = screen.getByRole("link",{name:"Retour à l'accueil"})
    expect(linkElement).toHaveAttribute("href","/")
  }
  )
  it("resetErrorBoundary should be called when user click on button",async () => {
    const user = userEvent.setup()
    const button = screen.getByRole("button",{name:"Retour à l'accueil"})
    await user.click(button)
    expect(mockErrorBoundary).toHaveBeenCalled()
    expect(mockErrorBoundary).toHaveBeenCalledTimes(1)
    

  }
  )

  
});
