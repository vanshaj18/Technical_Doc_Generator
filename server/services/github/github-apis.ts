/**
 * Fetches metadata for a specific GitHub repository using the GitHub REST API.
 *
 * @param owner - The username or organization name that owns the repository.
 * @param repo - The name of the repository to fetch.
 * @returns A Promise that resolves to the Axios response containing repository data if successful,
 *          or an object with the HTTP status and error text if the request fails.
 *
 * @throws Will throw an error if the required environment variables for authentication or base URL are not set.
 *
 * @example
 * ```typescript
 * const repoData = await fetchGithubRepo('octocat', 'Hello-World');
 * ```
 */
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BearerToken = process.env.GITHUB_BEARER_TOKEN;
const GithubBaseURL = process.env.GITHUB_BASE_URL;

if (!BearerToken) {
    throw new Error("GITHUB_BEARER_TOKEN environment variable is not set.");
}

if (!GithubBaseURL) { 
    throw new Error(" Github Base URL is not set in env ")
}
// fetching the github repo of a given user
const getGithubRepo = async (owner: string, repo: string) => {
    const url = `${GithubBaseURL}/${owner}/${repo}`;
    console.log(url);

    const repoRes = await axios.get(url,{
            headers: {
                Accept: "application/vnd.github+json",  
                Authorization: `Bearer ${BearerToken}`,
                "X-GitHub-Api-Version": "2022-11-28"
            }
        }
    )

    if (repoRes.status !== 200) {
        return { status: repoRes.status, errorText: repoRes.statusText };
    }
    return {status: repoRes.status, data: repoRes.data};
}
// get the file structure using the github repo strucutre
const getGithubRepoFileTree = async(owner: string , repo: string, default_branch: string) => {
    const url = `${GithubBaseURL}/${owner}/${repo}/git/trees/${default_branch}?recursive=1`;
    const treeRes = await axios.get(url,
        {
            headers: {
                Accept: "application/vnd.github+json",  
                Authorization: `Bearer ${BearerToken}`,
                "X-GitHub-Api-Version": "2022-11-28"
            }
        }
    )

    if (treeRes.status !== 200) {
        return { status: treeRes.status, errorText: treeRes.statusText };
    }

    return {status: treeRes.status, data: treeRes.data};
}

const getRawGithubRepo = async(files: any, owner: string, repo: string, default_branch: string) => {
    const baseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${default_branch}`;
    const results = await Promise.all(
        files.map(
            async (file: any) => {
            const rawUrl = `${baseUrl}/${file.path}`;
            const contentRes = await axios.get(rawUrl);
            
            // if unable to convert the particular file
            // into raw markdown, return the status and errorText
            // do not interrupt
            if (contentRes.status !== 200) {
                return { path: file.path, status: contentRes.status, errorText: contentRes.statusText };
            }
            // else return the raw markdown content.
            return { path: file.path, status: contentRes.status, content: contentRes.data };
        })
    );

    // intended to stay okay for all the cases. 
    // the error in generating the Raw case is handled in the mapping
    // and will be filtered outside the api
    return {status: 200, files: results}

}

export {
    getGithubRepo, getGithubRepoFileTree, getRawGithubRepo
}