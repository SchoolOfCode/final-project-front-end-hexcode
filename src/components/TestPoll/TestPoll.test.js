import { render, screen } from "@testing-library/react";
import TestPoll from "./index.js";

// TODO: This needs to be changed - since TestPoll does not render a 'learn react' link
test("renders learn react link", () => {
  render(<TestPoll />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
