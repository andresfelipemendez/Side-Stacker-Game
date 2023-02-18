import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from '../App.css';
import {
    Card,
    Form,
    Input,
    FormGroup,
    Col,
    Row,
    Label,
    Container,
} from 'reactstrap';

export default function CreateGame() {
    const [gameName, setGameName] = useState("");
    const [gameStatus, setGameStatus] = useState("");
    const navigate = useNavigate();

    async function createGame(e) {
        e.preventDefault();
        console.log(" before send createGame");

        await fetch("http://localhost:5000/games/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                game_name: gameName,
                game_status: gameStatus
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                navigate("/");
            })
            .catch((error) => {
                console.error("Error:", error);
            });


        console.log("after createGame");
    }

    return (
        <Card className="mt-3">
            <Container>
                <Row className="mt-3"> 
                    <h3>Create New Game</h3>
                </Row>
                <Form onSubmit={createGame} className="mt-3">
                    <FormGroup row>
                        <Label for="game-name-input" size="MD" sm={3}>
                            Game Name
                        </Label>
                        <Col sm={6}>
                            <Input
                                id="game-name-input"
                                type="text"
                                className="form-control"
                                value={gameName}
                                onChange={(e) => setGameName(e.target.value)}
                            />
                        </Col>
                        <Col sm={3}>
                        <Input
                            type="submit"
                            value="New Game"
                            className="btn btn-primary"
                        />
                        </Col>
                    </FormGroup>
                </Form>
            </Container>
        </Card>
    );
}