export default interface User {
    uid: string,
    email: string,
    name: string,
    password: string,
    provider: string
    token: string
}