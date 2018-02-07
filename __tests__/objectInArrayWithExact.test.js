import assertMatchesExpected from "./__mocks__/utils";

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
    it.skip("should generate expected flow types", () =>
      assertMatchesExpected(
        "objectInArray/objectInArray.swagger.yaml",
        "objectInArray/objectInArrayWithExact.flow.js"
      )
    );
  });

  describe("Open API V3: parse objct in array", () => {
    it("should generate expected flow types", () =>
      assertMatchesExpected(
        "objectInArray/objectInArray.swagger-v2.yaml",
        "objectInArray/objectInArrayWithExact.flow.js"
      ));
  });
});
