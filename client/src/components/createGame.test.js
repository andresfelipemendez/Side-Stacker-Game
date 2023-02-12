import React from "react";
import axios from "axios";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import { Router, Route, useHistory } from "react-router-dom";
import CreateGame from "./createGame";
import { createMemoryHistory } from "history";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("CreateGame component", () => {
  beforeEach(() => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  const onSubmit = jest.fn();
  it("creates a game", async () => {
    const component = render(<CreateGame />);

    const nameInput = component.getByLabelText("Name");
    const statusInput = component.getByLabelText("Status");
    const submitButton = component.getByText("Create Game");

    fireEvent.change(nameInput, { target: { value: "Game 1" } });
    fireEvent.change(statusInput, { target: { value: "running" } });

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "http://localhost:5000/games/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            game_name: "Game 1",
            game_status: "running",
          }),
        }
      );
    });
  });
});
