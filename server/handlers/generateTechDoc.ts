import { Request, Response } from 'express';
import { generateGithubDoc } from '../services/github/generate-github-doc';
import { GithubRawToDoc } from '../services/agent/agent-api';

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
            console.log(githubRes);

            //THE RESULT WILL BE CONSUMED BY LLM MODULE TO
            // GENERATE THE OUTPUT IN BEAUTIFUL FORMAT
            const llminput = githubRes.data;
            const modelOutput = await GithubRawToDoc(llminput);

            if (modelOutput.status !== 200){
                return res.status(modelOutput.status).json( {
                    error: modelOutput.errorText || ' Error generating model output from Github Raw Data input'
                })
            }

            return res.status(200).json({
                data: modelOutput.result
            })
        }

        else {
            return res.status(400).json({error: " Invalid type "});
        }

    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
};
