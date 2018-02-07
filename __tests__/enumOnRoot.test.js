import fs from "fs";
import path from "path";
import { FlowTypeGenerator, generator } from "../src/index";

jest.mock("commander", () => ({
  checkRequired: true,
  arguments: jest.fn().mockReturnThis(),
  option: jest.fn().mockReturnThis(),
  action: jest.fn().mockReturnThis(),
  parse: jest.fn().mockReturnThis()
}));

describe("generate flow types", () => {
  describe("Open API V2: parse enum on root element", () => {
    it.skip("should generate expected flow types", () => {
      const file = path.join(__dirname, "__mocks__/enumOnRoot/enumOnRoot.swagger-v2.yaml");
      const expected = path.join(__dirname, "__mocks__/enumOnRoot/enumOnRoot.flow.js");
      const expectedString = fs.readFileSync(expected, "utf8");
      const output = generator(file);
      expect(output).toEqual(expectedString);
    });
  });

  describe("Open API V3: parse enum on root element", () => {
    it("should generate expected flow types", () => {
      const file = path.join(__dirname, "__mocks__/enumOnRoot/enumOnRoot.swagger-v2.yaml");
      const expected = path.join(__dirname, "__mocks__/enumOnRoot/enumOnRoot.flow.js");
      const expectedString = fs.readFileSync(expected, "utf8");
      const output = generator(file);
      expect(output).toEqual(expectedString);
    });
  });
});
