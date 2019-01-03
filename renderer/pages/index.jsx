import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Button } from 'semantic-ui-react';
import Layout from '../layout/main.jsx';
import Board from '../component/board.jsx';
import PlayersForm from '../component/players-form.jsx';
import { productName } from '../../package';

const Game = (props) => {
    return (
        <>
            <Board />
            <Button onClick={props.onAbort}>End game</Button>
        </>
    );
};
Game.propTypes = {
    onAbort : PropTypes.func.isRequired
};

const Index = () => {
    const [isInGame, setIsInGame] = useState(false);
    const handleStart = (playerInfo) => {
        console.log('player info:');
        console.log(playerInfo);
        setIsInGame(true);
    };
    const handleAbort = () => {
        setIsInGame(false);
    };
    return (
        <Layout>
            <Header as="h1" textAlign="center" content={productName} />
            {isInGame ?
                <Game onAbort={handleAbort} /> :
                <PlayersForm onSubmit={handleStart} />
            }
        </Layout>
    );
};

export default Index;
