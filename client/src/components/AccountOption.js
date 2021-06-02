export default function AccountOption({ link, label, textDisplay }) {
    return (
        <div className="form-container">
            {textDisplay}
            <a href={`/${link}`}>{label}</a>
        </div>
    )
}