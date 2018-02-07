#! /usr/bin/env node
// @flow
import program from "commander";
import prettier from "prettier";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";

// Swagger data types are base on types supported by the JSON-Scheme Draft4.
const typeMapping = {
  array: "Array<*>",
  boolean: "boolean",
  integer: "number",
  number: "number",
  null: "null",
  object: "Object",
  Object: "Object",
  string: "string",
  enum: "string"
};

const definitionTypeName = (ref): string => {
  let re = /#\/components\/schemas\/(.*)/;
  let found = ref.match(re);
  if (found) {
    return found[1];
  }

  re = /#\/definitions\/(.*)/;
  found = ref.match(re);
  if (found) {
    return found[1];
  }
  return "";
};

// app.pharmacy.serializers.PharmacySchema => Pharmacy
const cleanPrefix = (str: string) =>
  str.replace(/(app.*serializers\.|Schema)/g, "");

const stripBrackets = (name: string) => name.replace(/[[\]']+/g, "");

const camel = (str: string) =>
  str.replace(/_([a-z])/g, (g: string) => g[1].toUpperCase());

const typeFor = (property: any): string => {
  let type = "";
  if (property.type === "array") {
    if ("$ref" in property.items) {
      type = `Array<${definitionTypeName(property.items.$ref)}>`;
    } else if (property.items.type === "object") {
      const child = propertiesTemplate(propertiesList(property.items)).replace(
        /"/g,
        ""
      );
      type = `Array<${child}>`;
    } else {
      type = `Array<${typeMapping[property.items.type]}>`;
    }
  } else if (property.type === "string" && "enum" in property) {
    type = property.enum.map(e => `'${e}'`).join(" | ");
  } else if (typeMapping[property.type]) {
    type = typeMapping[property.type];
  } else if (property.$ref) {
    type = definitionTypeName(property.$ref);
  } else if (
    property &&
    property.allOf &&
    property.allOf[0] &&
    property.allOf[0].$ref
  ) {
    type = definitionTypeName(property.allOf[0].$ref);
  } else {
    type = "*";
  }

  if (program.checkNullable && property["x-nullable"]) type = `?${type}`;

  return cleanPrefix(type);
};

const isRequired = (propertyName: string, definition: Object): boolean => {
  const result =
    definition.required && definition.required.indexOf(propertyName) >= 0;
  return result;
};

const propertyKeyForDefinition = (
  propName: string,
  definition: Object
): string => {
  if (program.checkRequired) {
    return `${propName}${isRequired(propName, definition) ? "" : "?"}`;
  }
  return propName;
};

const propertiesList = (definition: Object) => {
  if ("allOf" in definition) {
    return definition.allOf.map(propertiesList);
  }

  if (definition.$ref) {
    return { $ref: definitionTypeName(definition.$ref) };
  }

  if ("type" in definition && definition.type !== "object") {
    return typeFor(definition);
  }

  if (
    !definition.properties ||
    Object.keys(definition.properties).length === 0
  ) {
    return {};
  }
  return Object.assign.apply(
    null,
    Object.keys(definition.properties).reduce(
      (properties: Array<Object>, propName: string) => {
        const arr = properties.concat({
          [propertyKeyForDefinition(propName, definition)]: typeFor(
            definition.properties[propName]
          )
        });
        return arr;
      },
      [{}]
    )
  );
};

const withExact = (property: string): string => {
  const result = property.replace(/{[^|]/g, "{|").replace(/[^|]}/g, "|}");
  return result;
};

const propertiesTemplate = (
  properties: Object | Array<Object> | string
): string => {
  let template;
  if (typeof properties === "string") {
    template = properties;
  } else if (Array.isArray(properties)) {
    template = properties
      .map(property => {
        let p = property.$ref ? `& ${property.$ref}` : JSON.stringify(property);
        if (!property.$ref && program.exact) {
          p = withExact(p);
        }
        return p;
      })
      .sort(a => (a[0] === "&" ? 1 : -1))
      .join(" ");
  } else if (program.exact) {
    template = withExact(JSON.stringify(properties));
  } else {
    template = JSON.stringify(properties);
  }

  return program.camelCase ? camel(template) : template;
};

const generate = (swagger: Object) => {
  const schemas =
    swagger.components && swagger.components.schemas
      ? swagger.components.schemas
      : swagger.definitions;
  const g = Object.keys(schemas)
    .reduce((acc: Array<Object>, definitionName: string) => {
      const arr = acc.concat({
        title: stripBrackets(definitionName),
        properties: propertiesList(schemas[definitionName])
      });
      return arr;
    }, [])
    .map(definition => {
      const s = `export type ${cleanPrefix(
        definition.title
      )} = ${propertiesTemplate(definition.properties).replace(/"/g, "")};`;

      return s;
    })
    .join(" ");
  return g;
};

export const generator = (file: string) => {
  const ext = path.extname(file);
  let doc;
  if (ext === ".yaml") {
    doc = yaml.safeLoad(fs.readFileSync(file, "utf8"));
  } else {
    doc = JSON.parse(fs.readFileSync(file, "utf8"));
  }
  const options = {
    parser: "flow"
  };
  const genDoc = generate(doc);
  const result = `// @flow\n${genDoc}`;
  return prettier.format(result, options);
};

export const writeToFile = (dist: string = "./flowtype.js", result: string) => {
  fs.writeFile(dist, result, err => {
    if (err) {
      throw err;
    }
  });
};

export const distFile = (p: Object, inputFileName: string) => {
  if (p.destination) {
    return p.destination;
  }
  const ext = path.parse(inputFileName).ext;
  return inputFileName.replace(ext, ".js");
};

program
  .arguments("<file>")
  .option("-d --destination <destination>", "Destination path")
  .option("-cr --check-required", "Add question mark to optional properties")
  .option("-cn --check-nullable", "Add question mark to nullable types")
  .option("-cc --camel-case", "Convert underscore syntax to camelCase")
  .option("-e --exact", "Add exact types")
  .action(file => {
    try {
      const result = generator(file);
      const dist = distFile(program, file);
      writeToFile(dist, result);
      console.log(`Generated flow types to ${dist}`);
    } catch (e) {
      console.log(e);
    }
  })
  .parse(process.argv);
