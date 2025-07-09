// Example: tsParser.ts
import { Project } from "ts-morph";
import Parser from "tree-sitter";
import * as Python from "tree-sitter-python";
import { parseTree, Node } from "jsonc-parser";

// TS/JS parsing
const parseTSorJSFile = async (path: string, content: string) => {
  const project = new Project({ useInMemoryFileSystem: true });
  const source = project.createSourceFile(path, content);

  const functions = source.getFunctions().map((fn) => fn.getName());
  const classes = source.getClasses().map((cls) => cls.getName());
  const imports = source.getImportDeclarations().map((imp) => imp.getModuleSpecifierValue());
  const variables = source.getVariableDeclarations().map((v) => v.getName());

  if (!functions || !Array.isArray(functions)) {
    return { status: 400, errorText: "Failed to parse functions" };
  }
  if (!classes || !Array.isArray(classes)) {
    return { status: 400, errorText: "Failed to parse classes" };
  }
  if (!imports || !Array.isArray(imports)) {
    return { status: 400, errorText: "Failed to parse imports" };
  }
  if (!variables || !Array.isArray(variables)) {
    return { status: 400, errorText: "Failed to parse variables" };
  }

  return {
    language: "typescript",
    path,
    functions,
    classes,
    imports,
    variables,
  };
};
// python parsing 
const parsePythonFile = async (path:string, content: string) => {
  try {
    const parser = new Parser();
    parser.setLanguage(Python as Parser.Language);

    const tree = parser.parse(content.trim());
    const root = tree.rootNode;

    const functions: string[] = [];
    const classes: string[] = [];

    const traverse = (node: Parser.SyntaxNode | undefined) => {  
      if (!node) {
        return { status: 400, errorText: "Node doesn't exist" };
      }

      const nameNode = node.childForFieldName("name");
      if ((node.type === "function_definition" || node.type === "class_definition") && !nameNode) {
        return { status: 400, errorText: "Node does not have a name" };
      }

      if (node.type === "function_definition") {
        if (nameNode) functions.push(nameNode.text);
      }

      if (node.type === "class_definition") {
        if (nameNode) classes.push(nameNode.text);
      }

      for (const child of node.namedChildren) {
        traverse(child);
      }
    };

    const traverseResult = traverse(root);

    if (traverseResult && traverseResult.status === 400) {
      return traverseResult;
    }

    return {
      language: "python",
      path,
      functions,
      classes,
    };
  } catch (e: any) {
    return {
      status: 400,
      language: "python",
      path,
      errorText: `Parse error: ${e.message}`,
    };
  }
};


// JSON parsing
const parseJSONFile = async (path: string, content: string) => {
  try {
    const tree = parseTree(content);
    const keys: string[] = [];

    const collectKeys = (node: Node | undefined, prefix = "") => {
      if (!node || node.type !== "object") {
        return { status: 400, errorText: "Node is not an object" };
      }

      for (const prop of node.children || []) {
        const keyNode = prop.children?.[0];
        const valueNode = prop.children?.[1];

        if (keyNode && keyNode.value) {
          const fullKey = prefix ? `${prefix}.${keyNode.value}` : keyNode.value;
          keys.push(fullKey);
          if (valueNode?.type === "object") {
            collectKeys(valueNode, fullKey);
          }
        }
      }
    };

    const collectKeysRes = collectKeys(tree);
    if (collectKeysRes && collectKeysRes.status == 400) {
      return collectKeysRes
    }

    return {
      status: 200,
      language: "json",
      path,
      keys,
      valid: true,
    };
  } catch (e: any) {
    return {
      status: 400,
      language: "json",
      path,
      valid: false,
      errorText: `Parse error: ${e.message}`,
    };
  }
};

const parseGoFile = async (path: string, content: string) => {
  console.log("not yet parsing the file");
  return {
    language: "go",
    path,
    valid: false,
    error: "Parse error: Go parsing not implemented yet",
  };
}

const parseYAMLFile = async (path: string, content:string) => {
  console.log("not yet parsing the file");
  return {
    language: "yaml",
    path,
    valid: false,
    error: "Parse error: YAML parsing not implemented yet",
  };
}

export { 
  parseTSorJSFile, 
  parsePythonFile, 
  parseJSONFile, 
  parseGoFile,
  parseYAMLFile,
}