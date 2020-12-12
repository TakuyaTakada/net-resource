import React from "react";
import { render, cleanup } from "@testing-library/react";
import AddButton from "./AddButton";

afterEach(cleanup);

describe("AddButton", () => {
  test("Snapshot", () => {
    const { asFragment } = render(<AddButton handleCreateOpen={() => null} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
