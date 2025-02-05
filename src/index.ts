import { app } from './app.js';
import type { IncomingMessage, ServerResponse } from 'node:http';
import 'dotenv/config';
import createDebug from 'debug';
import { HtmlError } from './error.js';
import { createHtmlString } from './template.js';

const debug = createDebug('demo:server');
const PORT = process.env.PORT || 3000;
// create a loca server to receive data from
const server = createServer(appRouter); // appRouter is the function that will handle the requests
// listen to the server
server.listen(PORT);
server.on('listening', listenManager);
server.on('error', (error: HtmlError, response: ServerResponse) => {
    if ('status'! in error) {
        error = { ...error, statusCode: 500, status: 'Internal Server Error' };
    }
    // console.error(error.message);
    debug(error.message, error.statusCode, error.status);

    const html = createHtmlString('Error', 'Error', error.message);
    response.statusCode = error.statusCode;
    response.statusMessage = error.status;
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end(html);
});
