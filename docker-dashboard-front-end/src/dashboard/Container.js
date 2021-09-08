import React, {useState, useEffect} from 'react';
import {useParams} from "react-router";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {Button, Grid} from "@material-ui/core";
import {Terminal} from 'xterm';
<<<<<<< HEAD
import 'xterm/css/xterm.css'
import Box from "@material-ui/core/Box";
=======
>>>>>>> 628ae4f (added ip box to connect with remote docker daemon)

function Container() {
    const [connect, setConnect] = useState(false);
    const { id } = useParams();
    const term = new Terminal();
<<<<<<< HEAD
    var protocol = window.location.protocol.replace('http', 'ws');
    var hostname = window.location.hostname === 'localhost' ? 'localhost:3001' : window.location.hostname;
    var client;
=======
    const client = new W3CWebSocket(`ws://127.0.0.1:3001/container/${id}/logs`);
    useEffect(() => {
        client.onopen= () => {
            console.log("WS opened");
        };

        fetch("/container/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setContainer(result)
                }
            )

    }, [])

>>>>>>> 628ae4f (added ip box to connect with remote docker daemon)
    const streamLogs = () => {
        term.open(document.getElementById('terminal'));
        client = new W3CWebSocket(`${protocol}//${hostname}/container/${id}/logs`);
        client.onopen = () => client.send('logs');
        client.onmessage = (data) => {
            term.writeln(data.data)
        }
    }
    //eslint-disable-next-line
    useEffect(() => connect ? streamLogs() : null, [connect])
    return(
        <div>
            <h1>{id}</h1>
            <Button
                onClick={() => setConnect(!connect)}
                variant={'outlined'}>
                {connect ? 'Close logs' : 'Connect to logs'}
            </Button>
            <Grid container justifyContent="center">
                <Box m={3}>
                    {connect ? <div id="terminal"/> : null}
                </Box>
            </Grid>
        </div>
    );
}

export default Container;