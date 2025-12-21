export default function Die(props) {
    return (
        <button className="die"
            style={
                props.isHeld ? {
                    backgroundColor: '#59E391'
                } : {}
            }
            onClick={() => props.hold(props.id)}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
            aria-pressed={props.isHeld}>
            {props.value}
        </button>
    )
}