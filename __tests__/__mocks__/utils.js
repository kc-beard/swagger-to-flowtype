import fs from "fs";
import path from "path";
import { generator } from "../../src/index";

export default function assertMatchesExpected(inputPath, expectedPath) {
  const file = path.join(__dirname, inputPath);
  const expected = path.join(__dirname, expectedPath);
  const expectedString = fs.readFileSync(expected, "utf8");
  const output = generator(file);
  expect(output).toEqual(expectedString);
}
