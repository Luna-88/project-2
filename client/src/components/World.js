import * as constants from "../constants"
import useWindowSize from "../hooks/useWindowSize"

export default function World({ image }) {
    const {height, width} = useWindowSize()
    console.log(`size: `, height, width)

    return (
        <div className="world-container" id="world-container">
            <div
                className="world"
                id="world"
                style={{
                    // height: "600px",
                    // width: "900px",

                    // VDR WORLD SIZE
                    margin: constants.spriteSize.width + `px`,
                    height: height - constants.spriteSize.height + `px` ,
                    width: width - constants.spriteSize.width + `px`,
                    backgroundImage: `url(${image})`,
                }}
            />
        </div>
    )
}

// VDR TEST
// console.log(`const worldWidth: `, constants.worldWidth)
// console.log(`const worldWidth + padding: `, window.innerHeight - constants.spriteSize.height + `px`)
// console.log(`const worldHeight: `, constants.worldHeight)
// console.log(`const worldHeight + padding: `, window.innerHeight - constants.spriteSize.height + 'px')