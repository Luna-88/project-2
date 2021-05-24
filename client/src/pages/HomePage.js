import { useHistory } from 'react-router-dom'

export default function HomePage() {
    const history = useHistory()

    return (
        <div className='home-page-container'>
            <button
                className='single-player-button'
                onClick={() => { history.push('/home-page/single-player') }}
            >Single Player</button>
            <button
                className='multiplayer-button'
                onClick={() => { history.push('/home-page/multiplayer') }}
            >Multiplayer</button>
        </div>
    )
}