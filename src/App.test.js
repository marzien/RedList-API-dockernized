import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

test("renders page header correctly", () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/IUCD RedList API/i)
  expect(linkElement).toBeInTheDocument()
})

test("App snapshot", () => {
  const { container } = render(<App />)
  expect(container.firstChild).toMatchSnapshot()
})
