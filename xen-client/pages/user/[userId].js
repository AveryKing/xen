import {getAllUsers, getUser} from '@/lib/db-admin';

export const getStaticPaths = async () => {
    const {users} = await getAllUsers();
    const paths = users.map((user) => {
        console.log(user)
        return {
            params: {
                userId: user.id.toString()
            }
        }
    })
    return {
        paths,
        fallback:false
    }
}

export const getStaticProps = async ({params}) => {
    let user = await getUser(params.userId);
    return {
        props: { user }
    }
}
const Profile = ({user}) => {
    return (
        <p>hey {user.name}</p>
    )
}

export default Profile;