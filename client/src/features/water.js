import React from 'react'

import Water from '../assets/tileset/tiles/water.png'
import { spriteSize } from '../models/constants'

import './styles.css'

export default function water({ children, position }) {

    const top = position ? (position[1] * spriteSize) : 0;
    const left = position ? (position[0] * spriteSize) : 0;
    
    return (
        <div className='water__container'
        style={{
            top,
            left,
            backgroundImage: `url('${Water}')`
        }}>
    
        { children }
    
        </div>
    )
}
