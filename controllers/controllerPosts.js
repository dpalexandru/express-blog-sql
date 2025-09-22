const posts = require('../data/posts.js');

//definisco funzione Index
const index = (req, res) => {
    let filteredPostsByTag = posts;

    if (req.query.tags) {
        const tagSearched = req.query.tags.toLowerCase();

        filteredPostsByTag = posts.filter(post => {
            // Preparo una copia dell'array di tag già in lowercase
            const lowerTags = post.tags.map(t => t.toLowerCase());
            return lowerTags.includes(tagSearched);
        });

        if (filteredPostsByTag.length === 0) {
            return res.status(404).json({
                error: "404 Not found",
                message: "post non trovato con il tag ricercato"
            })
        }
    }

    res.json(filteredPostsByTag);
};

//definisco funzione Show
const show = (req, res) => {
    const id = parseInt(req.params.id);

    //trovo l'elemento nell'array posts attraverso l'id
    const post = posts.find(item => item.id === id);

    //verifico se la pizza è stata trovata 
    if (!post) {
        return res.status(404).json({ error: "404 Not found", message: "post non trovato" })
    }

    res.send(post);
}

//definisco funzione Store
const store = (req, res) => {
    // nuovo id partendo dall'ultimo presete
    const newId = posts[posts.length - 1].id + 1;
    //destrutturing oggetto ricevuto
    const { title, content, image, tags } = req.body;

    // campi obbligatori in input
    if (!title || !content || !image || !tags) {
        return res.status(400).json({ error: 'title, content, image e tags sono obbligatori' });
    }
    //creo e aggiungo nuovo oggetto
    const newPost = { id: newId, title, content, image, tags };
    posts.push(newPost);

    //stato corretto e restituzione oggetto appena creato
    return res.status(201).json(newPost);
};

//definisco funzione Update
const update = (req, res) => {
    const id = parseInt(req.params.id);

    //recupero il post richiesto
    const post = posts.find(item => item.id === id)

    //controlliamo se 'id inserito corrisponde a un id esistente
    if (!post) { res.status(404).json({ error: "404 Non trovato", message: "Id inserito non corrisponde con post esistente" }) }
    //destrutturo oggetto in input
    const { title, content, image, tags } = req.body;
    // campi obbligatori in input
    if (!title || !content || !image || !tags) {
        return res.status(400).json({ error: 'title, content, image e tags sono obbligatori' });
    }


    //modifico i dati del post
    post.title = title;
    post.content = content;
    post.image = image;
    post.tags = tags;

    res.json(posts);
}

//definisco funzione Modify
const modify = (req, res) => {
    const id = parseInt(req.params.id);

    //recupero il post richiesto
    const post = posts.find(item => item.id === id);

    if (!post) { return res.status(404).json({ error: "404 Non trovato", message: "Id inserito non corrisponde con post esistente" }) }
    //destrutturo oggetto in input
    const { title } = req.body;
    // campi obbligatori in input
    if (!title) {
        return res.status(400).json({ error: 'title obbligatorio' });
    };

    //modifico i dati del post
    post.title = title;

    res.json(post);


}

//definisco funzione DESTROY
const destroy = (req, res) => {
    const id = parseInt(req.params.id);

    //cerco l'elemento da eliminare attraverso id 
    const index = posts.findIndex(item => item.id === id);

    // Verifichiamo se abbiamo trovato l'elemento cercato
    if (index === -1) {
        return res.status(404).json({ error: "404 Not found", message: "post non trovato" })

    }

    //Eliminiamo l'elemento solo se trovato 
    posts.splice(index, 1);

    //verifichiamo in console l'avvenuta elimizazione del post desiderato
    console.log(posts);

    res.sendStatus(204);

}

//esporto tutte le funzioni in un oggetto
module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}