import { getGithubRepo, getGithubRepoFileTree, getRawGithubRepo } from "./github-apis";
import { RepoData } from "./githubRepoType";

export async function generateGithubDoc(repoURL: string){
    const match = repoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) throw new Error('Invalid GitHub URL');
    const [_, owner, repo] = match;

    // call the get repo api to get the repo of the given url
    // this will only work for public repos
    // todo: add api for handling private repos
    const repoRes = await getGithubRepo(owner, repo);
    
    if (repoRes.status !== 200) {
        return { status: repoRes.status, errorText: repoRes.errorText };
    }

    if (!repoRes.data || typeof repoRes.data === "undefined" || repoRes.data === null) {
        return { status: 500, errorText: "Repository data is unknown or missing." };
    }

    const repoData = repoRes.data as RepoData;
    const default_branch = repoData.default_branch;

    // now with the default branch will call 
    // the tree api to get the strucutre of the
    // repo
    const treesRes = await getGithubRepoFileTree(owner, repo, default_branch);
    if (treesRes.status !== 200) {
        return { status: treesRes.status, errorText: treesRes.errorText };
    }

    const treeData = treesRes.data as { tree: any[] };

    // extracting the files
    const files = treeData.tree.filter(
        (f: any) =>
        f.type === 'blob' &&
        /\.(ts|js|tsx|jsx|md|json|yml|yaml|py|go|java|c|cpp)$/i.test(f.path)
    );

    // using the files fetch the raw markdown of the github repo using
    // raw.githubusercontent.com 
    const repoRawResult = await getRawGithubRepo(files, owner, repo, default_branch)
    const results = repoRawResult.files

    return { 
        status: 200,
        data: {
            metadata: {
                name: repoData.full_name,
                description: repoData.description,
                stars: repoData.stargazers_count,
                forks: repoData.forks_count,
                language: repoData.language,
                default_branch,
            },
            files: results
        }
    }
}