import {Router} from "express";
import {loginUserSchema, registerUserSchema} from "../validation/validationSchemaAuth.js";
import {validateBody} from "../validation/validateBody.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {
    loginUserController,
    logoutUserController,
    refreshUserSessionController,
    registerUserController
} from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);
authRouter.post('/login', validateBody(loginUserSchema),ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default authRouter;