import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGame() {
    const [gameName, setGameName] = useState("");
    const [gameStatus, setGameStatus] = useState("");
    const [gameStartTime, setGameStartTime] = useState("");
    const [gameEndTime, setGameEndTime] = useState("");
    const [gameDuration, setGameDuration] = useState("");
    const [gamePlayers, setGamePlayers] = useState("");
    const [gameWinner, setGameWinner] = useState("");
    const [gameLoser, setGameLoser] = useState("");
    const navigate = useNavigate();
    
    async function createGame() {
        const response = await fetch("http://localhost:5000/games/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                game_name: gameName,
                game_status: gameStatus
            }),
        });
        
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            window.alert(message);
            return;
        }
    
        navigate("/");
    }
    
    return (
        <div className="container">
        <h3>Create New Game</h3>
        <form>
            <div className="form-group">
            <label htmlFor="game-name-input">Name</label>
            <input
                id="game-name-input"   
                type="text"
                className="form-control"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
            />
            </div>
            
            <div className="form-group">
            <label htmlFor="game-status-input">Status</label>
            <input
                id="game-status-input"
                type="text"
                className="form-control"
                value={gameStatus}
                onChange={(e) => setGameStatus(e.target.value)}
            />
            </div>
    
            <div className="form-group">
            <input
                type="submit"
                value="Create Game"
                className="btn btn-primary"
                onSubmit={createGame}
            />
            </div>
        </form>
        </div>
    );
}