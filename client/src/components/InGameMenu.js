import React, { useState, useContext } from 'react'
import Sound from 'react-sound'
import handleClickWithFetch from '../models/handleClickWithFetch'
import useGameMenu from '../hooks/useGameMenu'
import AmbientMusic from '../assets/audio/ambient-music.mp3'

import AdminContext from '../contexts/admin/adminContext'
// import PlayerContext from '../contexts/player/PlayerContext'

export default function InGameMenu() {
    const { isAdmin, setIsAdmin } = useContext(AdminContext)
    // const { isLoggedIn, setIsLoggedIn } = useContext(PlayerContext)
    const [isPlaying, setIsPlaying] = useState(false)

    const { serverResponse,
        setServerResponse,
        inventoryItem } = useGameMenu()

    function hasItem(item) {
        if (item === false || item.length === 0) {
            return '❌'
        } else if (item === true) {
            return '🔫'
        } else {
            return item
        }
    }

    return (
        <div className="in-menu-container">
            <div class="dropdown">
                {isAdmin ?
                    <a href='http://localhost:3000/admin'>
                        <button
                            class="menu-button"
                        // onClick={() =>

                        // handleClickWithFetch(
                        //     setServerResponse,
                        //     'GET',
                        //     '/api/in-game-menu/options'
                        // )
                        // }
                        >
                            ADMIN Options
                    </button>
                    </a>
                    : null}
                <button class="menu-button">Inventory</button>
                {inventoryItem && (
                    <div class="dropdown-content">
                        <div>Gaia Gun: {hasItem(inventoryItem.gaiaGun)}</div>
                        <div>
                            Cartridges: {hasItem(inventoryItem.cartridge)}
                        </div>
                        <div>
                            Spaceship Pieces:{' '}
                            {hasItem(inventoryItem.spaceshipPieces)}
                        </div>
                        <div>
                            Hard Drive Pieces:{' '}
                            {hasItem(inventoryItem.hardDrivePieces)}
                        </div>
                    </div>
                )}
            </div>

            <button
                class="menu-button"
                onClick={() =>
                    handleClickWithFetch(
                        setServerResponse,
                        'GET',
                        '/api/in-game-menu/tooltips'
                    )
                }
            >
                Tooltips
            </button>
            <div>
                <button
                    class="menu-button"
                    onClick={() => setIsPlaying(!isPlaying)}>{!isPlaying ? 'Play Music' : 'Stop Music'}</button>
                <Sound
                    url={AmbientMusic}
                    playStatus={
                        isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
                    }
                    autoLoad={true}
                    loop={true}
                    volume={10} />
            </div>
            <button
                class="menu-button"
                onClick={() =>
                    handleClickWithFetch(
                        setServerResponse,
                        'GET',
                        '/api/in-game-menu/save-game'
                    )
                }
            >
                Save Game
            </button>
            <button
                class="menu-button"
                onClick={() =>
                    handleClickWithFetch(
                        setServerResponse,
                        'GET',
                        '/api/in-game-menu/exit-game'
                    )
                }
            >
                Exit Game
            </button>
            { isAdmin ? (
                <button
                    class="menu-button"

                    onClick={() => setIsAdmin(false)}>
                    ADMIN MODE ON
                </button>
            ) : (
                <button
                    class="menu-button"
                    onClick={() => setIsAdmin(true)}>
                    ADMIN MODE OFF
                </button>
            )}
            <div class="server-response">
                {serverResponse && <div>{serverResponse}</div>}
            </div>
        </div>
    )
}
