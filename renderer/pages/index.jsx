import React, { useState } from 'react';
import Layout from '../layout/website.jsx';
import PlayersForm from '../component/players-form.jsx';

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
                <button onClick={handleAbort}>End game</button> :
                <PlayersForm onSubmit={handleStart} />
            }
        </Layout>
    );
};

export default Index;
