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
    ],
    comments: [
        {
            userHandle: 'king',
            postId:'e384fr7h3e239if3u3hfi',
            body: 'hello, world!',
            createdAt: '2022-03-08T11:46:01.018Z'
        }
    ],
    notifications: [
        {
            recipient: 'king',
            sender: 'avery',
            read: 'true || false',
            postId: 'e384fr7h3e239if3u3hfi',
            type: 'like || comment',
            createdAt: '2022-04-02T11:46:01.018Z'
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