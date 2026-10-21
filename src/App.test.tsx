import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders the name and every scene", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1, name: "Chris Kang" })).toBeInTheDocument();
  ["experience", "highlights", "journey", "credits", "projects", "skills", "contact"].forEach((id) => {
    expect(document.getElementById(id)).toBeInTheDocument();
  });
});

test("selecting a timeline clip shows its details", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /Senior Engineer, Xero/ }));
  expect(screen.getByRole("heading", { level: 3, name: /Senior Engineer at Xero/ })).toBeInTheDocument();
});

test("playhead scrubs with the keyboard", () => {
  render(<App />);
  const playhead = screen.getByRole("slider", { name: "Timeline playhead" });
  fireEvent.keyDown(playhead, { key: "End" });
  expect(screen.getByRole("heading", { level: 3, name: /Software Engineer at Atlassian/ })).toBeInTheDocument();
});

test("film credits link each poster", () => {
  render(<App />);
  const posters = screen.getAllByRole("img", { name: /poster$/ });
  expect(posters).toHaveLength(6);
  expect(posters[0].closest("a")).toHaveAttribute("href", expect.stringContaining("themoviedb.org"));
});

test("projects no longer include GIG Roster", () => {
  render(<App />);
  expect(screen.queryByText(/GIG Roster/)).not.toBeInTheDocument();
});
