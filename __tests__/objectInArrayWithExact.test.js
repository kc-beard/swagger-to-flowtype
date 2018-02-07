import fs from "fs";
import path from "path";
import { generator } from "../src/index";

jest.mock("commander", () => {
  return {
    exact: true,
    checkRequired: true,
    arguments: jest.fn().mockReturnThis(),
    option: jest.fn().mockReturnThis(),
    action: jest.fn().mockReturnThis(),
    parse: jest.fn().mockReturnThis()
  };
});

describe("generate flow types", () => {
  describe("Open API V2: parse objct in array", () => {
    it.skip("should generate expected flow types", () => {
      const file = path.join(
        __dirname,
        "__mocks__/objectInArray/objectInArray.swagger.yaml"
      );
      const expected = path.join(
        __dirname,
        "__mocks__/objectInArray/objectInArrayWithExact.flow.js"
      );
      const expectedString = fs.readFileSync(expected, "utf8");
      const output = generator(file);
      expect(output).toEqual(expectedString);
    });
  });

  describe("Open API V3: parse objct in array", () => {
    it("should generate expected flow types", () => {
      const file = path.join(
        __dirname,
        "__mocks__/objectInArray/objectInArray.swagger-v2.yaml"
      );
      const expected = path.join(
        __dirname,
        "__mocks__/objectInArray/objectInArrayWithExact.flow.js"
      );
      const expectedString = fs.readFileSync(expected, "utf8");
      const output = generator(file);
      expect(output).toEqual(expectedString);
    });
  });
});
