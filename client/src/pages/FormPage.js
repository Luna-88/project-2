import AccountOption from '../components/AccountOption'
import Form from '../components/Form'
import spacer from '../assets/images/backgrounds/spacer.png'

// import title from '../assets/images/titles/title-heroside.png'
// import world-bg from '../assets/images/titles/world_2.png'

export default function FormPage({ isRegister = false }) {
    let api = '/api/register'
    let redirect = '/sign-in'
    let textDisplay = 'Already have an account?'
    let link = 'sign-in'
    let label = 'Sign In'

    if (isRegister === true) {
        api = '/api/sign-in'
        redirect = '/home-page'
        textDisplay = "Don't have an account?"
        link = 'register'
        label = 'Register'
    }

    return (
        <div className="welcome-container omit-login-image">
            <section className="game-title">
                <img
                    src={spacer}
                    width={1920 * 0.55}
                    height={1080 * 0.55}
                    alt="img"
                />
            </section>
            <section>
                <div className="form-section">
                    <Form api={api} redirect={redirect} />
                </div>
                <AccountOption
                    link={link}
                    label={label}
                    textDisplay={textDisplay}
                />
            </section>
        </div>
    )
}
