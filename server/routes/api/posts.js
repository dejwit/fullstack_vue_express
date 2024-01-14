const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

/**
 * login abc123
 * pass pass123
 */


const uri = "mongodb+srv://abc123:pass123@cluster0.aztsbk0.mongodb.net/?retryWrites=true&w=majority";


//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).sort({createdAt: -1}).toArray());    
});

//Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect 
    (uri, {
        serverApi: {
          version: mongodb.ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    return client.db('vue_express').collection('posts');
}

module.exports = router;

