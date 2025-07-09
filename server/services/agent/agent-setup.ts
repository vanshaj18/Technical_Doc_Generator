import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate} from '@langchain/core/prompts';

const systemPrompt = `
You are a technical writer and software engineer.

Convert parsed source code and metadata into developer-friendly documentation.

Structure the documentation like this:
1. Project Overview
2. Features / Purpose
3. File Structure
4. Key Functions and Classes with descriptions
5. Setup Instructions (use clues from files like README or package.json)
6. Example Usage (based on functions if no README)
7. Edge Cases and Notes
8. Conclusion

Use Markdown formatting.

`
const template = `
Project Metadata:
Name: {name}
Description: {description}
Language: {language}
Stars: {stars}
Forks: {forks}
Branch: {default_branch}

Parsed Files:
{fileSummaries}

`

export const getLLM = async () => {
    try {
        const model = new ChatOpenAI({
            model: 'gpt-4o',
            temperature: 0.8,
            // max_token: ,
            // top_p: ,
        });
        const prompt = new PromptTemplate({
            template: template,
            inputVariables: [`metadata`, `fileSummary`],
            partialVariables: {
                system: systemPrompt
            }
        });

        const chain = prompt.pipe(model);

        return { status: 200, chain: chain, errorText: null };
    } catch (error: any) {
        return { status: 500, chain: null, errorText: error?.message || 'Unknown error' };
    }
}