import Logo from "@/components/elements/Logo"
import { render , screen} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

describe('Logo of the app', () => {
  beforeEach(() => {
    render(
    <BrowserRouter>
    <Logo/>
    </BrowserRouter>)
  })
  it('should contains a link redirecting to home', () => {
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href","/")
  })
  it('should contains a link containing an image', () => {
    const link = screen.getByRole("link")
    const imageInsideLink = link.querySelector("img")
    expect(imageInsideLink).toBeInTheDocument()
  })

})