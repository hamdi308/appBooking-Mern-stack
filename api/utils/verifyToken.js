import jwt from 'jsonwebtoken';
import { createError } from './error.js';
export const verifyToken = (req, res, next) => {
    const token = req.cookies.acess_token;
    if (!token) {
        return next(createError(401, "You are not authentificated!"));
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next()
    });
};
export const verifyUser = (req, res, next) => {
    verifyToken(req, res,next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else
            return next(createError(403, "you are not authorized"));
        
    });
};
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res,next, () => {
        if (req.user.isAdmin) {
            next()
        } else return next(createError(403, "you are not Admin")) ;
            })
};