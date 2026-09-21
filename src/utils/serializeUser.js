export const serializeUser = (user) => ({
    name: user.name,
    email: user.email,
    password: user.avatarUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    _id: user._id,
});