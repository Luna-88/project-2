import * as constants from "../constants"

export default function World({ image }) {
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
                    height: window.innerHeight - constants.spriteSize.height + `px` ,
                    width: window.innerWidth - constants.spriteSize.width + `px`,
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