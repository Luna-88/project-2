export default function AccountOption({ Link }) {
    return (
        <div className="form-container">
            Already have an account?{' '}
            <a href="/sign-in">{Link}</a>
        </div>
    )
}