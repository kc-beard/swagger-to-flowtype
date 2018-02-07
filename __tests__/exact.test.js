import assertMatchesExpected from "./__mocks__/utils";

jest.mock("commander", () => ({
  exact: true,
  arguments: jest.fn().mockReturnThis(),
  option: jest.fn().mockReturnThis(),
  action: jest.fn().mockReturnThis(),
  parse: jest.fn().mockReturnThis()
}));

describe("generate flow types", () => {
  describe("Open API V2: with --exact", () => {
    it("should generate expected flow types from swagger.yml", () =>
      assertMatchesExpected(
        "exact/swagger.yaml",
        "exact/expected.yaml.flow.js"
      )
    );

    it("should generate expected flow types from swagger.json", () =>
      assertMatchesExpected(
        "exact/swagger.json",
        "exact/expected.json.flow.js"
      )
    );
  });

  describe("Open API V3: with --exact", () => {
    it("should generate expected flow types from swagger-v2.yml", () =>
      assertMatchesExpected(
        "exact/swagger-v2.yaml",
        "exact/expected-v2.yaml.flow.js"
      ));

    it("should generate expected flow types from swagger-v2.json", () =>
      assertMatchesExpected(
        "exact/swagger-v2.json",
        "exact/expected-v2.json.flow.js"
      ));
  });
});
