import {User} from './types/user'

const testUser: User = {
    id: 1,
    email: 'test@gmail.com',
    role: 'admin'
};

export async function getUser() {
    await new Promise ((resolve) => setTimeout(resolve, 1000))

    const authToken = generateAuthToken()

    return [200, {authToken, user: testUser}] as const
};

export const login = async () => {
    await new Promise ((resolve) => setTimeout(resolve, 1000))

    
    const authToken = generateAuthToken()

    return [200, {authToken, user: testUser}] as const
}

const generateAuthToken = () => {
    return Math.random().toString(32).substring(2)
}