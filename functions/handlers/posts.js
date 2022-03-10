const {db} = require('../util/admin');

// Get all posts

exports.getAllPosts = (req, res) => {
    db.collection('posts')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            const posts = [];
            data.forEach(doc => {
                posts.push({
                    postId: doc.id,
                    ...doc.data()
                });
            })
            return res.json(posts)
        })
        .catch(err => console.error);
};

// Create post

exports.createPost = (req, res) => {
    const newPost = {
        userHandle: req.user.handle,
        body: req.body.body,
        createdAt: new Date().toISOString()
    };

    db.collection('posts')
        .add(newPost)
        .then(doc => {
            return res.json({message: `post ${doc.id} created successfully`});
        })
        .catch(err => {
            console.error(err);

            return res.status(500).json({error: 'something went wrong'});
        })
};

// Retrieve one post
exports.getPost = (req, res) => {
    let postData = {};
    db.doc(`/posts/${req.params.postId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({error: 'Post not found'});
            }
            postData = doc.data();
            postData.postId = doc.id;
            return db
                .collection('comments')
                .orderBy('createdAt', 'desc')
                .where('postId', '==', req.params.postId)
                .get();
        })
        .then((data) => {
            postData.comments = [];
            data.forEach((doc) => {

                postData.comments.push(doc.data());
            });
            return res.json(postData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({error: err.code});
        });
};

// Comment on post

exports.commentOnPost = (req, res) => {
    if (!req.body.body.trim().length) {
        return res.status(400).json({error: 'Comment cannot be empty'});
    }

    const newComment = {
        body: req.body.body,
        userHandle: req.user.handle,
        createdAt: new Date().toISOString(),
        postId: req.params.postId,
        userImage: req.user.imageUrl
    };

    db.doc(`/posts/${req.params.postId}`).get()
        .then(doc => {
            if(!doc.exists) {
                return res.status(404).json({error: 'Post does not exist'});
            }
            return db.collection('comments').add(newComment);
        })
        .then(() => {
            res.status(201).json(newComment);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
        })
}