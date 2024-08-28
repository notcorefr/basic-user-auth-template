import { sessionModel } from "@models/session";
import { NextFunction, Request, Response } from "express";


async function checkAuth(req: Request, res: Response, next: NextFunction) {

    const { sessionId } = req.cookies;


    if (!sessionId) {
        req.metaData = undefined;
        next();
        return;
    }


    const sessionDoc = await sessionModel.findOne({ sessionId });
    if (!sessionDoc || !sessionDoc.expiresOn || !sessionDoc.sessionId || !sessionDoc.username) {
        req.metaData = undefined;
        next();
        return;
    }


    const today = new Date();

    if (sessionDoc.expiresOn.getTime > today.getTime) {
        res.cookie('sessionId', '', { expires: new Date(0), path: '/' });
        sessionDoc.deleteOne();
        req.metaData = undefined;
        next();
        return;
    }

    const date = 7;
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (date * 24 * 60 * 60 * 1000));

    res.cookie('sessionId', `${sessionDoc.sessionId}`, {
        maxAge: expiryDate.getTime(),
        path: '/',
        sameSite: 'strict'
    });

    req.metaData = {
        user: {
            username: sessionDoc.username,
        },
        session: {
            id: sessionDoc.sessionId,
            expiresOn: sessionDoc.expiresOn,
        }
    }

    next();
}


export {checkAuth};
