import assertMatchesExpected from "./__mocks__/utils";

jest.mock("commander", () => ({
  checkRequired: true,
  arguments: jest.fn().mockReturnThis(),
  option: jest.fn().mockReturnThis(),
  action: jest.fn().mockReturnThis(),
  parse: jest.fn().mockReturnThis()
}));

describe("generate flow types", () => {
  describe("Open API V2: with --check-required from swagger.yaml", () => {
    it("should generate expected flow types", () =>
      assertMatchesExpected(
        "checkRequired/swagger.yaml",
        "checkRequired/expected.yaml.flow.js"
      )
    );

    it("should generate expected flow types from swagger.json", () =>
      assertMatchesExpected(
        "checkRequired/swagger.json",
        "checkRequired/expected.json.flow.js"
      )
    );
  });

  describe("Open API V3: with --check-required", () => {
    it("should generate expected flow types from swagger-v2.yaml", () =>
      assertMatchesExpected(
        "checkRequired/swagger-v2.yaml",
        "checkRequired/expected-v2.yaml.flow.js"
      ));

    it("should generate expected flow types from swagger-v2.json", () =>
      assertMatchesExpected(
        "checkRequired/swagger-v2.json",
        "checkRequired/expected-v2.json.flow.js"
      ));
  });
});
