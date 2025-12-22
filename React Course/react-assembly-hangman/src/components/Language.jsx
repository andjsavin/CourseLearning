export default function Language(props) {
    return (
        <div style={
            {
                backgroundColor: props.alive ? props.backgroundColor : props.backgroundColor + '1A',
                color: props.color,
            }
        }>
            <div
                style={{
                    opacity: props.alive ? 1.0 : 0.1
                }}>
                {props.name}
            </div>
            {!props.alive && <div
                style={{
                    position: 'absolute'
                }}>
                💀
            </div>}
        </div>
    )
}