export async function getUsers() {
    return (await import('./db/admin-users.js')).default
}

/** @return { import('./db/admin-users.js').default[number] } */
export async function getUser(username) {
    const users = await getUsers()
    return users.find((user) => {
        return user.username === username
    })
}
