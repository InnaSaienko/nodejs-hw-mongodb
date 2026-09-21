import {Router} from "express";
import {loginUserSchema, registerUserSchema} from "../validation/validationShemaAuth.js";
import {validateBody} from "../validation/validateBody.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {
    loginUserController,
    logoutUserController,
    refreshUserSessionController,
    registerUserController
} from "../controllers/authControllers.js";

const routerAuth = Router();

routerAuth.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);
routerAuth.post('/login', validateBody(loginUserSchema),ctrlWrapper(loginUserController),
);

routerAuth.post('/logout', ctrlWrapper(logoutUserController));

routerAuth.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default routerAuth;