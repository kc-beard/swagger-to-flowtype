import fs from "fs";
import path from "path";
import { generator } from "../src/index";

jest.mock("commander", () => ({
  exact: true,
  arguments: jest.fn().mockReturnThis(),
  option: jest.fn().mockReturnThis(),
  action: jest.fn().mockReturnThis(),
  parse: jest.fn().mockReturnThis()
}));

describe("generate flow types", () => {
  describe("with --exact", () => {
    it("should generate expected flow types", () => {
      const file = path.join(__dirname, "__mocks__/swagger-v2.yaml");
      const expected = path.join(
        __dirname,
        "__mocks__/exact/expected.yaml.flow.js"
      );
      const expectedString = fs.readFileSync(expected, "utf8");
      const output = generator(file);
      expect(output).toEqual(expectedString);
    });

    it("should generate expected flow types from swagger-v2.json", () => {
      const file = path.join(__dirname, "__mocks__/swagger-v2.json");
      const expected = path.join(
        __dirname,
        "__mocks__/exact/expected.json.flow.js"
      );
      const expectedString = fs.readFileSync(expected, "utf8");
      const output = generator(file);
      expect(output).toEqual(expectedString);
    });
  });
});
