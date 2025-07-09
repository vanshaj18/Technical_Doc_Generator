// parserUtil.test.ts
describe("Python Parser", () => {
  it("should extract functions and classes", () => {
    const code = `def add(a, b):
    return a + b

class Calculator:
    def multiply(self, x, y):
        return x * y`;

    const result = parsePython(code);

    expect(result.language).toBe("python");
    expect(result.functions).toEqual(expect.arrayContaining(["add", "multiply"]));
    expect(result.classes).toContain("Calculator");
  });
});


// parserUtil.ts

import Parser from "tree-sitter";
import * as Python from "tree-sitter-python";

export const parsePython = (content: string) => {
  const parser = new Parser();
  parser.setLanguage(Python as Parser.Language);

  const tree = parser.parse(content.trim());
  const root = tree.rootNode;

  const functions: string[] = [];
  const classes: string[] = [];

  const traverse = (node: Parser.SyntaxNode | undefined) => {
    if (!node) return;

    if (node.type === "function_definition") {
      const nameNode = node.childForFieldName("name");
      if (nameNode) functions.push(nameNode.text);
    }

    if (node.type === "class_definition") {
      const nameNode = node.childForFieldName("name");
      if (nameNode) classes.push(nameNode.text);
    }

    for (const child of node.namedChildren) {
      traverse(child);
    }
  };

  traverse(root);

  return {
    language: "python",
    functions,
    classes,
  };
};

