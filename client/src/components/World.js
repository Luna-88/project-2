import * as constants from "../models/constants"
import useWindowSize from "../hooks/useWindowSize"
import solar from '../assets/images/energies/solar.png'
import flashlight from '../assets/images/objects/flashlight.png'
import Object from "./Object"

export default function World({ image }) {
    const { height, width } = useWindowSize()

    return (
        <div className="world-container" id="world-container">
            <div
                className="world"
                id="world"
                style={{
                    // VDR WORLD SIZE
                    margin: constants.spriteSize.width + `px`,
                    height: height - constants.spriteSize.height + `px`,
                    width: width - constants.spriteSize.width + `px`,
                    backgroundImage: `url(${image})`,
                    backgroundSize: '100% 100%',
                }}
            >
                <Object image={solar} offsetTop={700} offsetLeft={800} />
                <Object image={flashlight} offsetTop={600} offsetLeft={1300} />
            </div>
        </div>
    )
}