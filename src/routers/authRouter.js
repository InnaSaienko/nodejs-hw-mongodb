import {Router} from "express";
import { loginUserSchema, loginWithGoogleOAuthSchema, registerUserSchema } from '../validation/validationSchemaAuth.js';
import {validateBody} from "../validation/validateBody.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {
    getGoogleOAuthUrlController,
    loginUserController, loginWithGoogleController,
    logoutUserController,
    refreshUserSessionController,
    registerUserController, requestResetPasswordByEmailController, resetPasswordController,
} from '../controllers/authControllers.js';
import { requestResetPasswordByEmailSchema } from '../validation/requestResetPasswordByEmailSchema.js';
import { resetPasswordValidationSchema } from '../validation/resetPasswordValidashionSchema.js';

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

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetPasswordByEmailSchema),
  ctrlWrapper(requestResetPasswordByEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordValidationSchema),
  resetPasswordController,
);

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));
authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default authRouter;