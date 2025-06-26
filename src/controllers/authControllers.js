import {loginUser, logoutUser, refreshUsersSession, registerUser} from '../services/authService.js';
import {ONE_DAY} from "../constants/timeConstants.js";
import {UsersCollection} from "../db/models/user.js";

const setupSessionCookies = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
};

export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};

export const loginUserController = async (req, res) => {
    const {session, user} = await loginUser(req.body);
    setupSessionCookies(res, session);

    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
            accessToken: session.accessToken,
            user
        },
    });
};

export const logoutUserController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
};

export const refreshUserSessionController = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message: "No token provided"});
        }

        const accessToken = authHeader.split(" ")[1];
        const session = await refreshUsersSession({accessToken});

        const user = await UsersCollection.findById(session.userId).select('name email');
        setupSessionCookies(res, session);

        res.json({
            status: 200,
            message: 'Successfully refreshed a session!',
            data: {
                accessToken: session.accessToken,
                user: {
                    name: user.name,
                    email: user.email
                }
            },
        });
    } catch (error) {
        next(error);
    }
};
