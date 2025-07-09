// parserUtil.test.ts

import { parsePythonFile } from "../parsers/code/parsetools";

describe("Python Parser", () => {
  it("should extract functions and classes", async () => {
    const code = `def add(a, b):
    return a + b

class Calculator:
    def multiply(self, x, y):
        return x * y`;

    const result = await parsePythonFile("python.py", code);

    expect(result.language).toBe("python");
    expect(result.functions).toEqual(expect.arrayContaining(["add", "multiply"]));
    expect(result.classes).toContain("Calculator");
  });
});
