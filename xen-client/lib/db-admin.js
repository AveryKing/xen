import db from './firebase-admin';

export async function getAllFeedback(siteId) {
    try {
        const snapshot = await db
            .collection('feedback')
            .where('siteId', '==', siteId)
            .get();
        const feedback = [];

        snapshot.forEach((doc) => {
            feedback.push({id: doc.id, ...doc.data()});
        });

        return {feedback};
    } catch (error) {
        return {error};
    }
}

export async function getAllSites() {
    const snapshot = await db.collection('sites').get()

    const sites = []

    snapshot.forEach((doc) => {
        sites.push({id: doc.id, ...doc.data()})
    })

    return {sites}
}

export const getAllUsers = () => {
    const users = [];
    db.collection('users').get()
        .then(res => {
            res.forEach((doc) => {
                users.push({id: doc.id, ...doc.data()});
            })
        });
    return {users}
}

export const getUser = async (id) => {
    let user = null;
    db.collection('users')
        .where('uid', '==', id).get()
        .then(res => {
            if (res[0].exists) {
                user = {id: res[0].id, ...res[0].data()};
            }
        })
    return user;
}