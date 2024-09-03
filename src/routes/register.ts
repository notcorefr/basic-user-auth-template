import {Router, Request, Response} from 'express';
const router = Router();

router.get('/', (req:Request , res: Response) => {
  if(req.metaData){
    res.redirect('/');
    return;
  }


  res.render('register', { metaData: null  });
  return;
});

export { router };

