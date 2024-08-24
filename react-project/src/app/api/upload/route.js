// app/api/upload/route.js
import fs from 'fs';
import path from 'path';
import busboy from 'busboy';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST (req) {
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.startsWith('multipart/form-data')) {
        return new Response(JSON.stringify({ error: 'Missing Content-Type or not multipart/form-data' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const bb = busboy({ headers: { 'content-type': contentType } });
    let saveTo
    return new Promise((resolve, reject) => {
        bb.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info;
            saveTo = path.join('./public/uploads', path.basename(filename));

            const writeStream = fs.createWriteStream(saveTo);
            file.pipe(writeStream);

            writeStream.on('finish', () => {
                console.log(`File uploaded and saved to ${saveTo}`);
            });

            writeStream.on('error', (err) => {
                reject(new Error('Error saving the file'));
            });
        });

        bb.on('close', () => {
            resolve(new Response(JSON.stringify({ url: `/uploads/${path.basename(saveTo)}` }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }));
        });

        bb.on('error', (err) => {
            reject(new Error('Error parsing the files'));
        });

        const reader = req.body.getReader();
        const pump = () => reader.read().then(({ done, value }) => {
            if (done) {
                bb.end();
            } else {
                bb.write(value);
                pump();
            }
        });

        pump().catch(err => {
            reject(new Error('Error reading the request body'));
        });
    });
}