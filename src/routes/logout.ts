import { Router, Request, Response } from 'express';
import { sessionModel } from '@models/session';
const router = Router();

router.get('/', async(req: Request, res: Response) => {
    const { sessionId } = req.cookies;
    
    if(!sessionId) {
        res.redirect('/login');
        return;
    }

    const session = await sessionModel.findOne({sessionId: sessionId});
    
    if(!session) {
        res.redirect('/login');
        return
    }

    res.cookie('sessionId', '', { expires: new Date(0), path: '/' });
    await session.deleteOne();

    res.redirect('/')
    return;
});


export { router };