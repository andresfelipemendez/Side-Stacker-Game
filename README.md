![Side Stacker logo](./client/public/logo.svg)
# Side-Stacker-Game

This project is a full-stack implementation of the popular two-player game, Side-Stacker. The game is similar to Connect-Four, but instead of the pieces stacking bottom-up, the pieces stack on either side of the board.

The game board consists of 7 rows and 7 columns and players take turns adding pieces to a row on one of the sides. The pieces stack on top of each other, and the game ends when there are no spaces left available or when a player has four consecutive pieces on a diagonal, column, or row.

The frontend allows each player to see the board and place moves that the other player sees. The game displays "player 1 won" or "player 2 lost" when the game is complete.

The backend uses a relational database to store the game, and updates are made in real-time without the need to refresh the page.

This project was built using the PERN (Postgres, Express, React, and Node.js) stack and Docker Compose for development and deployment.

## Built With

[![My Skills](https://skills.thijs.gg/icons?i=postgres,express,react,nodejs,docker,svg)](https://skills.thijs.gg)

# Getting started 

## Prerequisites

To run this project locally, you must first have the following installed:

* [Docker](https://docs.docker.com/engine/installation/)
* [docker-compose](https://docs.docker.com/compose/install/)


# Installation

The following steps will run a local instance of the Side Stacker using the default configuration file (docker-compose.yml):

1. Clone this repository
   ```sh
   git clone https://github.com/andresfelipemendez/Side-Stacker-Game.
   ```

2. Change directory into the root of the project.
   ```sh
   cd Side-Stacker-Game
   ```
3. start docker compose
   ```sh
   docker-compose up
   ```

# How to use
1. To run the game, navigate to [localhost:3000](http://localhost:3000/) in your web browser.
2. In the "Create Game" section, enter your name and click the "New Game" button to start a new game.
3. Once the game is created, you will be redirected to the game board as Player 1.
4. In a new browser window navigate to [localhost:3000](http://localhost:3000/) again
5. You should now see a new row in the "Running Games" table with your game name.
6. Click the "Player 2" button next to your game to join as Player 2 and start playing.


# How to play

1. The game is played by two players, who take turns stacking pieces on the board.
2. Each row on the board has seven pieces, and there are arrow buttons on the left and right sides of each row.
3. To stack a piece, click on the arrow button on the side of the row where you want to place it.
4. The objective of the game is to be the first player to stack four pieces in a row in any of the eight directions on the board.
5. The four pieces can be stacked horizontally, vertically, or diagonally, in any direction.
6. If a player succeeds in stacking four pieces in a row, they win the game.
7. If all the rows on the board are filled with pieces and no player has stacked four in a row, the game ends in a tie.
8. Enjoy the game and have fun!
