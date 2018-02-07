import { FlowTypeGenerator } from "../src/index";
import assertMatchesExpected from "./__mocks__/utils";

jest.mock("commander", () => ({
  checkRequired: false,
  arguments: jest.fn().mockReturnThis(),
  option: jest.fn().mockReturnThis(),
  action: jest.fn().mockReturnThis(),
  parse: jest.fn().mockReturnThis()
}));

describe("generate flow types", () => {
  describe("Open API V2: without --check-required", () => {
    it.skip("should generate expected flow types from swagger.yaml", () =>
      assertMatchesExpected(
        "swagger.yaml",
        "expected.yaml.flow.js"
      )
    );

    it.skip("should generate expected flow types from swagger.json", () =>
      assertMatchesExpected(
        "swagger.json",
        "expected.json.flow.js"
      )
    );
  });

  describe("Open API V3: without --check-required", () => {
    it("should generate expected flow types from swagger-v2.yaml", () =>
      assertMatchesExpected(
        "swagger-v2.yaml",
        "expected-v2.yaml.flow.js"
      ));

    it("should generate expected flow types from swagger-v2.json", () =>
      assertMatchesExpected(
        "swagger-v2.json",
        "expected-v2.json.flow.js"
      ));
  });
});
