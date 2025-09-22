//funzione del middlewere 
const notFound = (req, res, next) => {
    res.status(404).json({
        error: "404 Not Found",
        message: "pagina non trovata"
    })
};

module.exports = notFound;