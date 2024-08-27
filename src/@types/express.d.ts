import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        metaData?: MetaData;
    }

    interface Response {
        cookie(name: string, value: any, options?: any): this;
    }


}