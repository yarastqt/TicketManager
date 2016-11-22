export function getUserById(users, userId) {
    return users.filter(
        (user) => user.id === userId
    ).pop() || {};
}