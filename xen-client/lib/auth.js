import React, {useState, useEffect, useContext, createContext} from 'react';
import firebase from './firebase';
import {Router} from "next/router";
import {createUser} from "./db";

const authContext = createContext();

export const AuthProvider = ({children}) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);
}

const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser);
            setLoading(false);
            createUser(user.uid, user);
            setUser(user);
            return user
        } else {
            setLoading(false);
            setUser(false);
            return false;
        }
    }
    const signInWithGithub = () => {
        setLoading(true)
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((res) => handleUser(res.user));
    }
    const signInWithGoogle = (redirect) => {
        setLoading(true)
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((response) => {
                handleUser(response.user)

                if (redirect) {
                    Router.push(redirect)
                }
            })
    }


    const signOut = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => handleUser(false));
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
        return () => unsubscribe();
    }, [])

    return {user, loading, signInWithGithub, signInWithGoogle, signOut}
}

const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL
    }
}