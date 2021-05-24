export default function World({ image }) {
    return (
        <div className='world-container' id='world-container'>
            <div className='world'
                id='world'
                style={{
                    height: '600px',
                    width: '900px',
                    backgroundImage: `url(${image})`,
                }} />
        </div>
    )
}