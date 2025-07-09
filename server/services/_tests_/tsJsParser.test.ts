import { describe, it } from "node:test";
import { parseTSorJSFile } from "../parsers/code/parsetools";

describe("TypeScript/JavaScript Parser (ts-morph)", () => {
  const filePath = "sample.ts";
  const content = `
    import fs from 'fs';

    export function greet(name: string) {
      return 'Hello, ' + name;
    }

    const PI = 3.14;
  `;

  it("should extract imports, functions, and variables", async () => {
    const result = await parseTSorJSFile(filePath, content);

    expect(result.language).toBe("typescript");
    // Check imports
    expect(result.imports).toContain("fs");
    // Check functions
    expect(result.functions).toContain("greet");
    // Check variables/constants
    expect(result.variables).toContain("PI");
  });
});
