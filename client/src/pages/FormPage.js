import AccountOption from '../components/AccountOption'
import Form from '../components/Form'

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
        <div className="fullscreen-container">
            <section className="spacer-section"></section>
            <section>
                <div className="form-section">
                    <Form api={api} redirect={redirect} />
                </div>
                <AccountOption Link={link} />
            </section>
        </div>
    )
}
