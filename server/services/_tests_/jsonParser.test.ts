import { parseJSONFile } from "../parsers/code/parsetools";

describe("JSON Parser", () => {
  const validContent = `{
    "name": "test-app",
    "version": "1.0.0",
    "dependencies": {
      "express": "^4.17.1",
      "typescript": "^5.0.0"
    }
  }`;

  const invalidContent = `{
    "name": "bad-json"
    "version": 1.0.0
  `;

  it("should extract top-level and nested keys", async () => {
    const result = await parseJSONFile("package.json", validContent);

    expect(result.valid).toBe(true);
    expect(result.language).toBe("json");
    expect(result.keys).toEqual([
      "name",
      "version",
      "dependencies",
      "dependencies.express",
      "dependencies.typescript"
    ]);
  });

  it("should handle invalid JSON", async () => {
    const result = await parseJSONFile("broken.json", invalidContent);

    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/Parse error/i);
  });
});
