import { resolve } from 'path';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import createDebug from 'debug';

export const app = express();
const debug = createDebug('demo:app');
app.disable('x-powered-by');

app.use((req: Request, res: Response, next: NextFunction) => {
    debug(req.method, req.url);
    next();
});

const controller = (req: Request, res: Response) => {
    res.send('Hola Mundo');
};

app.get('/', controller);
app.post('/');
app.patch('/');
app.put('/');
app.delete('/');

app.use('*', (req: Request, res: Response) => {
    res.status(405);
    res.setHeader('Content.Type', 'text/plain; charset=utf-8');
    res.send('Method Not Allowed');
});
