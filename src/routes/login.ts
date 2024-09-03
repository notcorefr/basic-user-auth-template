import { Router, Request, Response } from 'express';
import {sessionModel } from '@models/session';
const router = Router();


router.get('/', async (req: Request , res: Response) => {

  if(req.metaData){
    res.redirect('/');
    return;
  }

  res.render('login', {metaData: null})

  
  // const { sessionId } = req.cookies;


  // if (!sessionId) {
  //   res.render('login', {
  //     metaData: null
  //   });
  //   return;
    
  // }

  // let sessionDoc = await sessionModel.findOne({ sessionId: sessionId });

  // if (!sessionDoc) {
  //   res.render('login', {
  //     metaData: null
  //   });
  //   return;
  // }

  // res.render('login', {
  //   metaData: {
  //     user: {
  //       username: sessionDoc.username,

  //     },
  //     session: {
  //       id: sessionDoc.sessionId,
  //       expiresOn: sessionDoc.expiresOn,
  //     }
  //   }
  // });
});


export { router };
