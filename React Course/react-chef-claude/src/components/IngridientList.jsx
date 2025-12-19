export default function IngridientList(props) {
    const listToShow = props.ingridientList.map(
        ingridient => {
            const key = crypto.randomUUID()
            return (
                <li key={key}>{ingridient}</li>
            )
        }
    )
    return (
        <div className="ingridient-list">
            {listToShow.length > 0 ? <h2>Ingridients on hand:</h2> : null}
            <ul>
                {listToShow}
            </ul>
        </div>
    )
}