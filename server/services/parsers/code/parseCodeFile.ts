import { parseGoFile, 
    parseJSONFile, 
    parsePythonFile,
    parseTSorJSFile, 
    parseYAMLFile 
} from "./parsetools";

export const parseCodeFile = async ({
  path,
  content
}: {
  path: string;
  content: string;
}) => {
  const ext = path.split(".").pop()?.toLowerCase();

  try {
    switch (ext) {
      case "ts":
      case "tsx":
      case "js":
      case "jsx":
        const result = await parseTSorJSFile(path, content);
        if (result?.status !== 400) {
          return result;
        }
        else {
          return {
            status: result?.status,
            error: result?.errorText,
            path,
            language: ext
          };
        }

      case "py":
        const pyResult = await parsePythonFile(path, content);
        if ("status" in pyResult && pyResult.status !== 400) {
          return pyResult;
        } else if ("status" in pyResult) {
          return {
            status: pyResult.status,
            error: pyResult.errorText,
            path,
            language: ext
          };
        } 
      case "json":
        const jsonResult = await parseJSONFile(path, content);
        if ("status" in jsonResult && jsonResult.status !== 400) {
          return jsonResult;
        } else if ("status" in jsonResult) {
          return {
            status: jsonResult.status,
            error: jsonResult.errorText,
            path,
            language: ext
          };
        }

      case "yml":
      case "yaml":
        return parseYAMLFile(path, content);

      case "go":
        return await parseGoFile(path, content);

      // Add support for Java, C, CPP, etc.

      default:
        return {
          language: "unknown",
          path,
          parsed: null,
          error: `Unsupported extension: .${ext}`
        };
    }
  } catch (err: any) {
    return {
      path,
      language: ext || "unknown",
      error: err.message || "Parsing error",
    };
  }
};
