export default function InputForm({ onFormSubmit }) {

    const handleSubmit = (formData) => {
        const newIngridient = formData.get("ingridient")
        onFormSubmit(newIngridient)
    }

    return (
        <form className="input-form" action={handleSubmit}>
            <input
                type="text"
                className="add-ingridient-input"
                placeholder="e.g. oregano"
                name="ingridient"
            />
            <button type="submit" className="add-ingridient-button">+ Add Ingridient</button>
        </form>
    )
}