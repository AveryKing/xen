
const {db, admin} = require('../util/admin');
const {signInWithEmailAndPassword, getAuth, getIdToken} = require("firebase/auth");
const {validateRegistrationData, validateLoginData} = require('../util/validation');

exports.registerUser = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };

    const {valid, errors} = validateRegistrationData(newUser);
    if(!valid) return res.status(400).json(errors);

    db.doc(`/users/${newUser.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({handle: 'username already taken'})
            } else {
                admin.auth()
                    .createUser({
                        email: newUser.email,
                        password: newUser.password
                    })
                    .then(data => {
                        const userData = {
                            handle: newUser.handle,
                            email: newUser.email,
                            createdAt: new Date().toISOString(),
                            userId: data.uid
                        };
                        return db.doc(`/users/${newUser.handle}`).set(userData)
                    })
                    .then(() => {
                        return res.status(201).json({message: `user '${newUser.handle}' created successfully`});
                    })
                    .catch(err => {
                        console.error(err);
                        if (err.code === 'auth/email-already-in-use') {
                            return res.status(400).json({email: 'email is already in use'});
                        } else {
                            return res.status(500).json({error: err.code})
                        }
                    })

            }

        });
};

exports.loginUser = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const {valid, errors} = validateLoginData(user);
    if(!valid) return res.status(400).json(errors);

    signInWithEmailAndPassword(getAuth(), user.email, user.password)
        .then(data => {
            return getIdToken(data.user);
        })
        .then(token => {
            return res.json({token})
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/wrong-password') {
                return res.status(403)
                    .json({general: "Wrong password"});
            } else {
                return res.status(500).json({error: err.code});
            }
        })
};