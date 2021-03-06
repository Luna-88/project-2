import React from 'react'

import DrawCanvas from './DrawCanvas'
import DrawTileMap from './DrawTileMap'
import Player from '../components/Player'

import mainSkin from '../assets/images/skins/skins-main.png'
import useKeyPress from "../hooks/useKeyPress"
import Dialogue from './Dialogue'

export default function GaiaGame() {

    // useKeyPress((e) => {
    //     let draw = document.getElementById('draw-canvas')
    //     if (e.key === "a") {  
    //         draw.style.display = 'none'   
    //         console.log('a')
    //         e.preventDefault()
    //     } else if 
    //         (e.key === "d") {
    //         draw.style.display = 'block'   
    //         } 
    //     }
    // )

    return (
        <div className="world-container">
            <div className="game-parent">
                <div className="camera game-child item-1">
                    <div id="parent" width='640px' height='640px'>
                        {/* <DrawCanvas /> */}
                        <DrawTileMap />
                        <Player skin={mainSkin} />
                    </div>
                </div>
                <Dialogue />
            </div>
        </div>
    )
}