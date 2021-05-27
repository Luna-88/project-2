import title from "../assets/images/titles/title-heroside.png"

export default function WelcomePage() {
    return (
        <div className="fullscreen-container">
            <section className="game-title">
                <img src={title} width={1920/2} height={1080/2} />
            </section>
            <section className="entry-section">
                <center>
                    <h1 className="entry-title">Welcome to Gaia</h1>
                    <a href="/register">Begin</a>
                </center>
            </section>
        </div>
    )
}