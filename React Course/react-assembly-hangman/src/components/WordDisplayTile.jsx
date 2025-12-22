export default function WordDisplayTile(props) {
    return (
        <div>
            {props.show && <span>{props.letter}</span>}
        </div>
    )
}