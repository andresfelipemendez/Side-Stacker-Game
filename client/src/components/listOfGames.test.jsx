import React from "react";
import { render, waitFor, fireEvent, act } from "@testing-library/react";
import axiosMock from "axios";
import ListOfGames from "./listOfGames";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

describe("ListOfGames component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches and displays a list of games", async () => {
    let games = [
      {
        _id: "1",
        game_id: "1",
        game_name: "Game 1",
        game_status: "running",
        game_start_time: "2022-01-01T00:00:00.000Z",
        game_end_time: "2022-01-01T01:00:00.000Z",
        game_duration: "1 hour",
        game_players: ["Player 1", "Player 2"],
        game_winner: "Player 1",
        game_loser: "Player 2",
      },
      {
        _id: "2",
        game_id: "2",
        game_name: "Game 2",
        game_status: "running",
        game_start_time: "2022-01-02T00:00:00.000Z",
        game_end_time: "2022-01-03T01:00:00.000Z",
        game_duration: "2 hour",
        game_players: ["Player 3", "Player 4"],
        game_winner: "Player 3",
        game_loser: "Player 4",
      },
    ];
    const stringyfied = JSON.stringify(games);
    fetch.mockResponse(stringyfied);

    let getByText, getAllByText, queryAllByRole;
    await act(async () => {
      ({ getByText, getAllByText, queryAllByRole } = render(<ListOfGames />));
    });
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock).toHaveBeenCalledWith("http://localhost:5000/games/");
    await waitFor(() => getByText("Game 1"));

    games.forEach((game) => {
      expect(getByText(game.game_name)).toBeInTheDocument();
      expect(getAllByText(game.game_status)).toHaveLength(2);
      expect(getByText(game.game_start_time)).toBeInTheDocument();
      expect(getByText(game.game_end_time)).toBeInTheDocument();
      expect(getByText(game.game_duration)).toBeInTheDocument();
      expect(getByText(game.game_winner)).toBeInTheDocument();
      expect(getByText(game.game_loser)).toBeInTheDocument();
    });

    expect(queryAllByRole("row")).toHaveLength(games.length + 1);
  });
});
