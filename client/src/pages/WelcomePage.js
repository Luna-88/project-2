import title from '../assets/images/titles/title-heroside.png'

export default function WelcomePage() {
    return (
        <div className="welcome-container">
            <section className="game-title">
                {/* <img src={title} width={1920 / 4} height={1080 / 4} alt="img" /> */}
            </section>
            <section className="entry-section">
                <center>
                    <h1 className="entry-title">Welcome to Gaia</h1>

                    <form action="/sign-in">
                        <button type="/sign-in" value="Begin">
                            Begin
                        </button>
                    </form>
                    {/* <a href="/sign-in">Begin</a> */}
                </center>
            </section>
        </div>
    )
}
