// schema structure; for reference only:
let db = {
    users: [
        {
            userId: 'fCvydo0mcSV3lsIciK1DjSqFBWQ2',
            email: 'avery@fbi.gov',
            handle:'king',
            createdAt: '2022-03-08T11:46:01.018Z',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/zensocial-501c5.appspot.com/o/1122608.png?alt=media',
            bio: 'Hello, my name is Avery',
            website:'https://fbi.gov',
            location: 'Heaven, Earth'
        }
    ],
    posts: [
        {
            userHandle: 'king',
            body: 'post body',
            createdAt: '2022-03-08T11:46:01.018Z',
            likeCount: 11,
            commentCount: 6
        }
    ]
};

// Redux state data
const userDetails = {
    credentials: {
        userId: 'fCvydo0mcSV3lsIciK1DjSqFBWQ2',
        email: 'avery@fbi.gov',
        handle: 'king',
        createdAt: '2022-03-08T11:46:01.018Z',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/zensocial-501c5.appspot.com/o/1122608.png?alt=media',
        bio: 'Hello, my name is Avery',
        website:'https://fbi.gov',
        location: 'Heaven, Earth'
    },
    likes: [
        {
            userHandle: 'king',
            postId: 'fCvydo0mcijdeid3jpK1DjSqFBWQ2'
        },
        {
            userHandle: 'king',
            postId: 'eekmtfrokmdroffrorfofgDjSqFBWQ2'
        },
    ]
}