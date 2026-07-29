import { registerSchema, loginSchema } from "../validators/auth.schema.js"
export const validateRegister = (req, res, next) => {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: result.error.issues[0].message
        });
    }

    next();
};

export const validateLogin = (req, res, next) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: result.error.issues[0].message,
        });
    }
    next();
};

