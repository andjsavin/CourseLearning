export const getErrorController = (req, res) => {
    res.status(404).json("Endpoint not found")
}