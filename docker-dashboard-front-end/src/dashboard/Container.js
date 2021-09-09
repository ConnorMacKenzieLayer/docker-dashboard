import React, {useEffect} from 'react';
import {useParams} from "react-router";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {Button} from "@material-ui/core";
import {Terminal} from 'xterm';

function Container() {
    const { id } = useParams();
    const term = new Terminal();
    var protocol = window.location.protocol.replace('http', 'ws');
    var hostname = window.location.hostname === 'localhost' ? 'localhost:3001' : window.location.hostname;
    const client = new W3CWebSocket(`${protocol}//${hostname}/container/${id}/logs`);
    
    useEffect(() => {
        client.onopen= () => {
            console.log("WS opened");
        };
        // eslint-disable-next-line
    }, [])

    const streamLogs = () => {
        term.open(document.getElementById('terminal'));
        client.send("logs");
        client.onmessage = (data) => {
            term.writeln(data.data)
        }
    }

    return(
        <div>
            <h1>{id}</h1>
            <Button
                onClick={streamLogs}
                variant={'outlined'}>
                Connect to logs
            </Button>
            <div id="terminal"/>
        </div>
    );
}

export default Container;