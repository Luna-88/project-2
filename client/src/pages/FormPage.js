import AccountOption from '../components/AccountOption'
import Form from '../components/Form'
import title from "../assets/images/titles/title-heroside.png"
// import world-bg from "../assets/images/titles/world_2.png"

export default function FormPage({ isRegister = false }) {
    let api = "/api/register"
    let redirect = "/sign-in"
    let link = 'Sign in'

    if (isRegister === true) {
        api = "/api/sign-in"
        redirect = "/home-page"
        link = "Register"
    }

    return (

        <div className="fullscreen-container login-image">
            <section className="game-title">
                <img src={title} width={1920*.55} height={1080*.55} />
                {/* <div>
                        <center>
                <a href="/register">Begin</a>
                        </center>
                </div> */}
            </section>
            <section>
                <div className="form-section">
                    <Form api={api} redirect={redirect} />
                </div>
                <AccountOption Link={link} />
            </section>
        </div>
    )
}
