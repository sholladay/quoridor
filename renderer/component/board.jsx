import React from 'react';

const WallRow = () => {
    return new Array(17).fill('_temp').map((elem, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <div key={index} className="wall-space" />;
    });
};

const MixedRow = () => {
    return new Array(17).fill('_temp').map((elem, index) => {
        const isEven = (index % 2) === 0;
        const type = isEven ? 'pawn' : 'wall';
        // eslint-disable-next-line react/no-array-index-key
        return <div key={index} className={`${type}-space`} />;
    });
};

const Board = () => {
    const rows = new Array(17).fill('_temp').map((elem, index) => {
        const isEven = (index % 2) === 0;
        const Row = isEven ? MixedRow : WallRow;
        // eslint-disable-next-line react/no-array-index-key
        return <Row key={index} />;
    });
    return (
        <>
            <div id="board">
                {rows}
            </div>
            <style jsx>{`
                #board {
                    display: grid;
                    grid-template-columns: repeat(8, 10% 1fr) 10%;
                    grid-auto-rows: 10% 1fr;
                    width: 60vmin;
                    min-width:400px;
                    height: 60vmin;
                    min-height:400px;
                    border: 0.25rem solid black;
                    margin-left: auto;
                    margin-right: auto;
                }
                .pawn-space {
                    background: hsl(40, 50%, 50%);
                }
                .wall-space {
                    background: hsl(40, 85%, 30%);
                }
            `}
            </style>
        </>
    );
};

export default Board;
