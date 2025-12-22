export default function StatusBar(props) {
    return (
        <div className="status-bar" 
        style={{...props.style, 
        visibility: props.gameStatus === '' && props.details === '' ? 
        'hidden' : 
        'visible'}}>
            <h2>{props.gameStatus}</h2>
            <p>{props.details}</p>
        </div>
    )
}