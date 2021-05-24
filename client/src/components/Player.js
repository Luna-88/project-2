import Actor from './Actor'
import useKeyPress from '../hooks/useKeyPress'
import useWalk from '../hooks/useWalk'

export default function Player({ skin }) {
    const { dir, step, walk, position } = useWalk(3)
    const data = {
        h: 32,
        w: 32,
    }

    useKeyPress((e) => {
        walk(e.key.replace('Arrow', '').toLowerCase())
        e.preventDefault()
    })

    return (
        < Actor
            sprite={skin}
            data={data}
            step={step}
            dir={dir}
            position={position}
        />
    )
}