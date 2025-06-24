import { Request, Response } from 'express';
import { generateGithubDoc } from '../services/github/generate-github-doc';

export async function generateTechDocHandler(req: Request, res: Response) {
    
    try{
        const {type, url} = req.body;

        if (!type || !url) {
            return res.status(400).json({error: 'Missing type or url in the request body'});
        }

        if (type == 'github') {
            const githubRes = await generateGithubDoc(url)
            if (githubRes.status !== 200) {
                return res.status(githubRes.status).json({ error: githubRes.errorText || 'Error generating GitHub doc.' });
            }
            return res.status(200).json({ message: 'Github Repo Raw generated successfully'});
        }

        else {
            return res.status(400).json({error: " Invalid type "});
        }

    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
};
