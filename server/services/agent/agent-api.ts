import { getLLM } from "./agent-setup";
import { summarizeMetadata, summarizeParsedFiles } from "./convertGithubToDoc";

// call the parsing services to parse the raw result from github
const buildLangchainInput = async (data: {
  metadata: any;
  files: any[];
}) => {
    const { metadata, files } = data;

    try {
        const [metadataSummary, fileSummary] = await Promise.all([
            summarizeMetadata(metadata),
            summarizeParsedFiles(files)
        ]);

        return {
            status: 200,
            metadata: metadataSummary,
            fileSummary: fileSummary
        };
    } catch (error: any) {
        return {
            status: error?.status || 500,
            errorText: error?.message || "An unexpected error occurred"
        };
    }
};

// function to handle raw data from github
// call the buildLangChainInput to build the input for LangChain
// call the chain setup 
// generate the response from the chain
// return the response

export async function GithubRawToDoc(githubRawData: any) {
    const metaData = githubRawData.data;
    const files = githubRawData.files;

    // prepare the data for LangChain
    const langChainInput = await buildLangchainInput({metadata: metaData, files: files});

    if (langChainInput.status !== 200) {
        return {
            status: langChainInput.status,
            errorText: langChainInput.errorText
        };
    }
    // Call the LangChain setup to get the chain
    const llmChainRes = await getLLM();
    const chain = llmChainRes.chain;
    if (llmChainRes.status !== 200 || !chain) {
        return {
            status: llmChainRes.status,
            errorText: llmChainRes.errorText || "Failed to get LLM Chain"
        }
    }

    // Pass the langChainInput to the LLM Chain
    const chainInput = {
        metadata: langChainInput.metadata?.data,
        fileSummary: langChainInput.fileSummary
    };
    const markDownResult = await chain.invoke(chainInput)
    const markDownText = markDownResult.text
    if (!markDownText){
        return {
            status: 500,
            errorText: " Failed to generate documentation "
        }
    };
    return {
        status: 200,
        result: markDownText
    };
}
