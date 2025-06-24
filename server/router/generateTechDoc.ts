import express from 'express';
import {generateTechDocHandler} from '../handlers/generateTechDoc';

// handling the resolving of 
const routerHandler = (fn: Function) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res)).catch(next);
}

const router = express.Router();
router.post('', routerHandler(generateTechDocHandler));

export default router;