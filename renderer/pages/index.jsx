import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Layout from '../layout/website.jsx';
import Board from '../component/board.jsx';
import PlayersForm from '../component/players-form.jsx';

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
            <h1>Quoridor</h1>
            <p>{isInGame ? 'Running game...' : 'An abstract strategy game'}</p>
            {isInGame ?
                <Game onAbort={handleAbort} /> :
                <PlayersForm onSubmit={handleStart} />
            }
        </Layout>
    );
};

export default Index;
