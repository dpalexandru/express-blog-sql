const connection = require('../data/db.js');

//definisco funzione Index
const index = (req, res) => {
    const sql = "SELECT * FROM posts";
    //eseguo 
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Errorre nell'esecuzione della querry" })
        res.json(results)
    })
};

//definisco funzione Show
const show = (req, res) => {
    const { id } = req.params;

    // preparo la query
    const postSql = "SELECT * FROM posts WHERE id = ?";

    connection.query(postSql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Errore nell'esecuzione della query" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Post non trovato" });
        }

        // ritorno il post trovato
        res.json(results[0]);
    });
};

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
    // recupero id
    const { id } = req.params;

    // preparo la query di DELETE
    const sql = "DELETE FROM posts WHERE id = ?";

    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Errore nell'esecuzione della query" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Post non trovato" });
        }

        // restituisco 204 
        res.sendStatus(204);
    });
};

//esporto tutte le funzioni in un oggetto
module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}