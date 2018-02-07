import assertMatchesExpected from "./__mocks__/utils";

jest.mock("commander", () => ({
  checkRequired: true,
  arguments: jest.fn().mockReturnThis(),
  option: jest.fn().mockReturnThis(),
  action: jest.fn().mockReturnThis(),
  parse: jest.fn().mockReturnThis()
}));

describe("generate flow types", () => {
  describe("Open API V2: parse enum on root element", () => {
    it("should generate expected flow types", () =>
      assertMatchesExpected(
        "enumOnRoot/enumOnRoot.swagger.yaml",
        "enumOnRoot/enumOnRoot.flow.js"
      )
    );
  });

  describe("Open API V3: parse enum on root element", () => {
    it("should generate expected flow types", () =>
      assertMatchesExpected(
        "enumOnRoot/enumOnRoot.swagger-v2.yaml",
        "enumOnRoot/enumOnRoot.flow.js"
      ));
  });
});
