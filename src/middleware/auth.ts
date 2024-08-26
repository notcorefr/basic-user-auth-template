import { sessionModel } from "@models/session";


async function checkAuth(req: any, res: any, next: any) {
    console.log(req.cookies)
    // const { sessionId } = req.cookies;

    // if(!sessionId){
    //     req.metaData = null;
    //     next();
    //     return;
    // }


    // const sessionDoc = await sessionModel.findOne({sessionId});
    // if(!sessionDoc || !sessionDoc.expiresOn){
    //     req.metaData = null;
    //     next();
    //     return;
    // }

    // console.log(sessionDoc)

//     const date = 7;
//     const expiryDate = new Date();
//     expiryDate.setTime(expiryDate.getTime() + (date * 24 * 60 * 60 * 1000));

//     if(sessionDoc.expiresOn > ){
//         res.cookie('sessionId', '', { expires: new Date(0), path: '/' });
//         req.metaData = null;
//         next();
//         return;
//     }

//     res.cookie('sessionId', sessionDoc.sessionId, { 
//        maxAge: expiryDate, 
//        path: '/',
//        sameSite: 'Strict'
//     });

    next(); 
}


export {checkAuth};
