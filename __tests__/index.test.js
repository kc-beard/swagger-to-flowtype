import fs from "fs";
import path from "path";
import { FlowTypeGenerator, generator } from "../src/index";

jest.mock("commander", () => ({
  checkRequired: false,
  arguments: jest.fn().mockReturnThis(),
  option: jest.fn().mockReturnThis(),
  action: jest.fn().mockReturnThis(),
  parse: jest.fn().mockReturnThis()
}));

describe("generate flow types", () => {
  describe("Open API V2: without --check-required", () => {
    it.skip("should generate expected flow types from swagger.yaml", () => {
      const file = path.join(__dirname, "__mocks__/swagger.yaml");
      const expected = path.join(__dirname, "__mocks__/expected.yaml.flow.js");
      const expectedString = fs.readFileSync(expected, "utf8");
      expect(generator(file)).toEqual(expectedString);
    });

    it.skip("should generate expected flow types from swagger.json", () => {
      const file = path.join(__dirname, "__mocks__/swagger.json");
      const expected = path.join(__dirname, "__mocks__/expected.json.flow.js");
      const expectedString = fs.readFileSync(expected, "utf8");
      expect(generator(file)).toEqual(expectedString);
    });
  });

  describe("Open API V3: without --check-required", () => {
    it("should generate expected flow types from swagger-v2.yaml", () => {
      const file = path.join(__dirname, "__mocks__/swagger-v2.yaml");
      const expected = path.join(
        __dirname,
        "__mocks__/expected-v2.yaml.flow.js"
      );
      const expectedString = fs.readFileSync(expected, "utf8");
      expect(generator(file)).toEqual(expectedString);
    });

    it("should generate expected flow types from swagger-v2.json", () => {
      const file = path.join(__dirname, "__mocks__/swagger-v2.json");
      const expected = path.join(
        __dirname,
        "__mocks__/expected-v2.json.flow.js"
      );
      const expectedString = fs.readFileSync(expected, "utf8");
      expect(generator(file)).toEqual(expectedString);
    });
  });
});
