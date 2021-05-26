import React from 'react'

import Water from './water'
import { spriteSize } from '../models/constants'

export default function Maptest({ tile, index }) {

    if(tile.value === 40) {
        return (
            <GroundTile>
                <Water position={index}>
                </Water>
            </GroundTile>
        )
    }
    return (
        <GroundTile >
          <div style={{
            backgroundImage: `url(../assets/tileset/tiles/${getTileImage(tile.value)}.png)`,
            height: spriteSize,
            width: spriteSize
          }}>
          </div>
        </GroundTile>
      );
}

export function getTileImage(type) {
    switch(type) {
      case 0:
        return 'grass'
      case 1:
          return 'tree-0_0'
      case 2:
          return 'tree-0_1'
      case 3:
          return 'tree-1_0'
      case 4:
          return 'tree-1_1'
      default:
    }
  }

export default function GroundTile({children}) {
    return (
    <div style={{
      backgroundImage: `url(../assets/tileset/tiles/grass.png')`,
      display: 'inline-flex',
      height: spriteSize,
      width: spriteSize
    }}>
      { children }
    </div>
    )
}