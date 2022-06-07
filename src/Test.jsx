import React from 'react'
import { VariableSizeList as List } from 'react-window';

function Test() {
    const rowHeights = new Array(1000)
        .fill(true)
        .map(() => 25 + Math.round(Math.random() * 50));

    const getItemSize = index => rowHeights[index];

    const Row = ({ index, style }) => (
        <div style={style}>Row {index}</div>
    );
    console.log(rowHeights);
    return (
        <List
            height={150}
            itemCount={1000}
            itemSize={getItemSize}
            width={300}
        >
            {Row}
        </List>
    )
}

export default Test