import {Router, Request, Response} from 'express';
const router = Router();

router.get('/', (req, res) => {
  if(req.metaData){
    res.render('index', {metaData: req.metaData})
    return;
  }

  res.render('index');
  return;
});


export { router };