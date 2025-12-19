export default function ClaudeRequest(props) {

    const handleClaudeRequest = () => {
        props.getRecipe(props.ingridients)
    }

    return (
        <div className="claude-request">
            <div className="claude-request-text">
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingridients</p>
            </div>
            <button className="claude-request-button" onClick={handleClaudeRequest}>Get a recipe</button>
        </div>
    )
}