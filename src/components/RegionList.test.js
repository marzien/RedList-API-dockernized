import React from "react"
import { render, wait } from "@testing-library/react"
import RegionList from "./RegionList"

test("RegionList snapshot", async () => {
  const utils = render(<RegionList />)
  const { container } = utils
  const finishLoading = () =>
    wait(() => expect(utils.queryByText("Loading...")).toBeNull())
  await finishLoading()
  expect(container.firstChild).toMatchSnapshot()
})
