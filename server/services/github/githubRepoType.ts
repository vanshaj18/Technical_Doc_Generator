interface RepoData {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    default_branch: string;
};

interface RepoRawData { 
    name: string,
    description: string,
    stars: number,
    forks: number,
    language: any,
    default_branch: string
    files: [[Object]]
}

export type {
    RepoData
}