interface MetaData {
    user:  User,
    session:  Session 
}

interface User {
    username: string,
}

interface Session {
    id: Number,
    expiresOn: Date,
}


