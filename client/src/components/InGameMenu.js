import handleClickWithFetch from '../models/handleClickWithFetch'
import useGameMenu from '../hooks/useGameMenu'

export default function InGameMenu() {
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
            <button
                class="menu-button"
                onClick={() =>
                    handleClickWithFetch(
                        setServerResponse,
                        'GET',
                        '/api/in-game-menu/options'
                    )
                }
            >
                Options
            </button>
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
            <div class="server-response">
                {serverResponse && <div>{serverResponse}</div>}
            </div>
        </div>
    )
}
