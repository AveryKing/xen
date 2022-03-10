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
        userImage: req.user.imageUrl,
        likeCount: 0,
        commentCount: 0,
        body: req.body.body,
        createdAt: new Date().toISOString()
    };

    db.collection('posts')
        .add(newPost)
        .then(doc => {
            newPost.postId = doc.id;
            return res.json(newPost);
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
            if (!doc.exists) {
                return res.status(404).json({error: 'Post does not exist'});
            }
            return doc.ref.update({commentCount: doc.data().commentCount + 1})
        })
        .then(() => {
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

//TODO: condense like/unlike into one function
// Like a post
exports.likePost = (req, res) => {
    const likeDoc = db.collection('likes')
        .where('userHandle', '==', req.user.handle)
        .where('postId', '==', req.params.postId)
        .limit(1)

    const postDoc = db.doc(`posts/${req.params.postId}`);
    let postData;

    postDoc.get()
        .then(doc => {
            if (doc.exists) {
                postData = doc.data();
                postData.postId = doc.id;
                return likeDoc.get();
            } else {
                return res.status(404).json({error: 'Post does not exist'});
            }
        })
        .then(data => {
            if (data.empty) {
                // Not yet liked
                return db.collection('likes').add({
                    postId: req.params.postId,
                    userHandle: req.user.handle
                })
                    .then(() => {
                        postData.likeCount++;
                        return postDoc.update({likeCount: postData.likeCount});
                    })
                    .then(() => {
                        return res.json(postData);
                    })
            } else {
                // Already liked
                return res.status(400).json({error: 'Post already liked'});
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code})
        })

}

// Unlike a post
exports.unlikePost = (req, res) => {
    const likeDoc = db.collection('likes')
        .where('userHandle', '==', req.user.handle)
        .where('postId', '==', req.params.postId)
        .limit(1)

    const postDoc = db.doc(`posts/${req.params.postId}`);
    let postData;

    postDoc.get()
        .then(doc => {
            if (doc.exists) {
                postData = doc.data();
                postData.postId = doc.id;
                return likeDoc.get();
            } else {
                return res.status(404).json({error: 'Post does not exist'});
            }
        })
        .then(data => {
            if (data.empty) {
                // Not yet liked
                return res.status(400).json({error: 'Post not yet liked'});


            } else {
                db.doc(`/likes/${data.docs[0].id}`).delete()
                    .then(() => {
                        postData.likeCount--;
                        return postDoc.update({likeCount: postData.likeCount});
                    })
                    .then(() => {
                        return res.json(postData);
                    })
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code})
        })
}