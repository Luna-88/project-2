import { spriteSize } from '../models/constants'
// import { grass } from '../models/tiles'

// import grass from '../assets/tileset/tiles/grass.png'

// import tree from '../assets/tileset/tiles/tree-0_0.png'


// import grass from '../assets/tileset/tiles/grass.png'

export default function GroundTile({ tile }) {
    return (
    // <div style={{
    //   backgroundImage: `url(${grass})`,
    //   display: 'inline-flex',
    //   height: spriteSize,
    //   width: spriteSize
    // }}>
    //   { children }
    // </div>
    <div style={{
      backgroundImage: `url(${tile})`,
      display: 'inline-flex',
      height: '32px',
      width: '32px'
    }}>
    </div>

    )
}