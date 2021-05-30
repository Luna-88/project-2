export default function AccountOption({ link, label }) {
    return (
        <div className="form-container">
            Already have an account?{' '}
            <a href={`/${link}`}>{label}</a>
        </div>
    )
}