import express from 'express';
import cors from 'cors';
import generateTechDoc from './router/generateTechDoc';


const app = express();
app.use(cors());
app.use(express.json());

// defining the general api
// for both github and website generation
app.use('/generate', generateTechDoc);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(` Server is running at PORT: ${PORT}`);
})

process.on('CLOSE', () => {
    console.log('Gracefully shutting down...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});