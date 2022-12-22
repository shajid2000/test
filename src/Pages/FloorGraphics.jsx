import React from 'react'

// components 
import FloorGraphicsBody from '../components/categoryPages/FloorGraphics/FloorGraphicsBody';

function FloorGraphics() {

    const topView = () => {
        window.scrollTo({ top: 0 });
    }

    topView();

    return (
        <>
            <FloorGraphicsBody />
        </>
    )
}

export default FloorGraphics