import { passOnSuccess, ScenarioMockApi, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

/**
 * Scenarios to test DPG and RLC Service driven evolution.
 * These scenarios here are considered acceptable from an Azure breaking change policy
 */

/**
 * Initially has no query parameters. After evolution, a new optional query parameter is added.
 * Note that when defining HEAD and GET methods for the same path, HEAD needs to be defined before
 * GET. Otherwise Express would register the GET handler as the handler for both and the mockapi.head would be ignored.
 */
Scenarios.DPGAddOptionalInput_NoParams = passOnSuccess(
  mockapi.head("/servicedriven/parameters", (req) => {
    return {
      status: 200,
      headers: { "content-length": "123" },
    };
  }),
);

/**
 * Initially only has one required Query Parameter. After evolution, a new optional query parameter is added.
 */
Scenarios.DPGAddOptionalInput = passOnSuccess(
  mockapi.get("/servicedriven/parameters", (req) => {
    if (req.query["parameter"]) {
      return {
        status: 200,
        body: json({ message: `An object was successfully returned` }),
      };
    } else {
      return {
        status: 400,
        body: json({ message: `Expected required parameter "parameter"` }),
      };
    }
  }),
);

/**
 * Initially has one required query parameter and one optional query parameter.  After evolution, a new optional query parameter is added
 */
Scenarios.DPGAddOptionalInput_RequiredOptionalParam = passOnSuccess(
  mockapi.put("/servicedriven/parameters", (req) => {
    if (req.query["requiredParam"]) {
      return {
        status: 200,
        body: json({ message: `An object was successfully returned` }),
      };
    } else {
      return {
        status: 400,
        body: json({ message: `Expected required parameter "requiredParam"` }),
      };
    }
  }),
);

/**
 * Initially has one optional query parameter. After evolution, a new optional query parameter is added
 */
Scenarios.DPGAddOptionalInput_OptionalParam = passOnSuccess(
  mockapi.get("/serviceDriven/moreParameters", (req) => {
    return {
      status: 200,
      body: json({ message: `An object was successfully returned` }),
    };
  }),
);

/**
 * A new body type is added (was JSON, and now JSON + JPEG).
 */
// coverageService.register("dpg", "DPGNewBodyType.JSON");
// coverageService.register("dpg", "DPGNewBodyType.JPEG");
Scenarios.DPGNewBodyType = passOnSuccess(
  mockapi.post("/servicedriven/parameters", (req) => {
    switch (req.headers["content-type"]) {
      case "image/jpeg":
        // req.expect.rawBodyEquals("binary");
        coverageService.track("dpg", "DPGNewBodyType.JPEG");
        return { status: 200 };
      case "application/json":
        req.expect.bodyEquals({ url: "http://example.org/myimage.jpeg" });
        coverageService.track("dpg", "DPGNewBodyType.JSON");
        return { status: 200 };
      default:
        throw new ValidationError("Should be image/jpeg or application/json", {}, req.headers["content-type"]);
    }
  }),
);

/**
 * Initially the path exists but there is no delete method. After evolution this is a new method in a known path
 */
Scenarios.DPGAddNewOperation = passOnSuccess(
  mockapi.delete("/servicedriven/parameters", (req) => {
    return {
      status: 204,
    };
  }),
);

/**
 * Initially neither path or method exist for this operation. After evolution, this is a new method in a new path
 */
Scenarios.DPGAddNewPath = passOnSuccess(
  mockapi.get("/servicedriven/newpath", (req) => {
    return {
      status: 200,
      body: json({ message: `An object was successfully returned` }),
    };
  }),
);

/**
 * An operation that is not part of the swagger definition but can be called
 */
Scenarios.DPGGlassBreaker = passOnSuccess(
  mockapi.get("/servicedriven/glassbreaker", (req) => {
    return {
      status: 200,
      body: json({ message: `An object was successfully returned` }),
    };
  }),
);
