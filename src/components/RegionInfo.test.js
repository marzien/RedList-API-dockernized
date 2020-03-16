import React from "react"
import { render, wait } from "@testing-library/react"
import RegionInfo from "./RegionInfo"

test("RegionInfo snapshot", async () => {
  const utils = render(<RegionInfo region={"southern_africa"} />)
  const { container } = utils
  const finishLoading = () =>
    wait(() => expect(utils.queryByText("Loading...")).toBeNull())
  await finishLoading()
  expect(container.firstChild).toMatchSnapshot()
})
