![Side Stacker logo](./client/public/logo.svg)
# Side-Stacker-Game

This project is a full-stack implementation of the popular two-player game, Side-Stacker. The game is similar to Connect-Four, but instead of the pieces stacking bottom-up, the pieces stack on either side of the board.

The game board consists of 7 rows and 7 columns and players take turns adding pieces to a row on one of the sides. The pieces stack on top of each other, and the game ends when there are no spaces left available or when a player has four consecutive pieces on a diagonal, column, or row.

The frontend allows each player to see the board and place moves that the other player sees. The game displays "player 1 won" or "player 2 lost" when the game is complete.

The backend uses a relational database to store the game, and updates are made in real-time without the need to refresh the page.

This project was built using the PERN (Postgres, Express, React, and Node.js) stack and Docker Compose for development and deployment.

### Built With

[![My Skills](https://skills.thijs.gg/icons?i=docker,nodejs,postgres,react)](https://skills.thijs.gg)

# Getting started 

## Prerequisites

To run this project locally, you must first have the following installed:


* [Docker](https://docs.docker.com/engine/installation/)
* [docker-compose](https://docs.docker.com/compose/install/)
