export const summarizeParsedFiles = async (files: any[]) => {
  return files.map(file => {
    return `File: ${file.path}
            Language: ${file.language || "Unknown"}
            Functions: ${file.functions?.join(', ') || 'None'}
            Classes: ${file.classes?.join(', ') || 'None'}
            Variables: ${file.variables?.join(', ') || 'None'}
            `;
    }).join("\n\n");
};

export const summarizeMetadata = async (metadata: any) => {
    try {
        const name = metadata.name || "Unknown";
        const description = metadata.description || "No description available";
        const stars = metadata.stars || 0;
        const forks = metadata.forks || 0;

        return {
            status: 200,
            data: `Repository Name: ${name}
                    Description: ${description}
                    Stars: ${stars}
                    Forks: ${forks}
                `
        };
    } catch (error: any) {
        return {
            status: 500,
            errorText: error?.message || "An error occurred while summarizing metadata."
        };
    }
}; 