import Smartphone from "@/components/elements/Smartphone"
import { render,screen } from "@testing-library/react"

describe('Smartphone Component', () => {
  beforeEach(() => {
    render(<Smartphone bgColor="bg-red-500"><div>Children content</div></Smartphone>)
  })
  it("should contains 'Children content'", () => {
    const childrenElement = screen.getByText("Children content")
    expect(childrenElement).toBeInTheDocument()
  })
  it("div with data-testid 'smartphone' should contains bgColor props in classname",() => {
    const containerDiv = screen.getByTestId("smartphone")
    expect(containerDiv).toHaveClass(/bg-red-500/)
  }
  )
})