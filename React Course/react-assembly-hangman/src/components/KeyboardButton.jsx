export default function KeyboardButton(props) {
    return (
        <button 
        style={{
            backgroundColor: !props.pressed ? '#FCBA29' :
                              props.pressed && props.correct ? '#10A95B' : 
                              props.pressed && !props.correct ? '#EC5D49' : '#FFFFFF'
        }}
        onClick={!props.pressed ? () => props.handleButtonClick(props.letter) : () => {}}>
            {props.letter}
        </button>
    )
}