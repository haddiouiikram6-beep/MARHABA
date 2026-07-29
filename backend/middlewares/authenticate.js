import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Accès non autorisé."

            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            error: "Token invalide ou expiré.",

        });

    }
};
export default authenticate;