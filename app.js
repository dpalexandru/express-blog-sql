const express = require('express');
const app = express();
const port = 3000;

//importo le routes 
const postRoutes = require('./routers/posts.js')

const errorHandler = require('./middlewears/errorsHeadler.js')
const notFound = require('./middlewears/notFound.js')

// body parsere per recuperare le informazioni passate tramite body della richiesta
app.use(express.json());
//middlware
app.use(express.static('public'));

//creo la routs principale 
app.get("/", (req, res) => {
    res.send("Benvenuto, collegamento riuscito")
});

//autorizzo all'uso delle routes a posts
app.use('/posts', postRoutes);

//middlewere 404 not found
app.use(notFound);
//middlwere che restituisce un ogetto con l'errore in caso di errori
app.use(errorHandler);

//lascio il server in ascolto sulla porto stabilit
app.listen(port, () => {
    console.log("richiesta effettuata")
})