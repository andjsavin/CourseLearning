export default function Entry(props) {
    return (
        <div className="entry">
            <div className="entry-image-container">
                <img src={props.entry.img.src} className="entry-img" alt={props.entry.img.alt} />
            </div>
            <div className="entry-details">
                <div className="entry-location">
                    <img src="./src/assets/marker.png" className="entry-marker" alt="map marker icon" />
                    <span className="entry-country">{props.entry.country}</span>
                    <a href={props.entry.googleMapsLink}
                        className="entry-map-link" target="_blank" rel="noreferrer">
                        View on Google Maps
                    </a>
                </div>
                <h1 className="entry-title">{props.entry.title}</h1>
                <h2 className="entry-dates">{props.entry.dates}</h2>
                <p className="entry-description">
                    {props.entry.text}
                </p>
            </div>
        </div>
    )
}