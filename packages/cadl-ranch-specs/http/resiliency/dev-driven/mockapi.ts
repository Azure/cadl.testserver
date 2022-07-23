import { passOnSuccess, ScenarioMockApi, mockapi, json } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.GetRawModel = passOnSuccess(
  mockapi.get("/customization/model/raw", (req) => {
    return {
      status: 200,
      body: json({ received: "raw" }),
    };
  }),
);

Scenarios.GetHandwrittenModel = passOnSuccess(
  mockapi.get("/customization/model/model", (req) => {
    return {
      status: 200,
      body: json({ received: "model" }),
    };
  }),
);

Scenarios.PostRawModel = passOnSuccess(
  mockapi.post("/customization/model/raw", (req) => {
    req.expect.bodyEquals({ hello: `world!` });
    return {
      status: 200,
      body: json({ received: "raw" }),
    };
  }),
);

Scenarios.PostHandwrittenModel = passOnSuccess(
  mockapi.post("/customization/model/model", (req) => {
    req.expect.bodyEquals({ hello: `world!` });
    return {
      status: 200,
      body: json({ received: "model" }),
    };
  }),
);

Scenarios.GetRawPages = passOnSuccess([
  mockapi.get("/customization/paging/raw/", (req) => {
    return {
      status: 200,
      body: json({
        values: [{ received: "raw" }],
        nextLink: req.baseUrl + "/customization/paging/raw/2",
      }),
    };
  }),
  mockapi.get("/customization/paging/raw/2", (req) => {
    return {
      status: 200,
      body: json({ values: [{ received: "raw" }] }),
    };
  }),
]);

Scenarios.GetHandwrittenModelPages = passOnSuccess([
  mockapi.get("/customization/paging/model/", (req) => {
    return {
      status: 200,
      body: json({
        values: [{ received: "model" }],
        nextLink: req.baseUrl + "/customization/paging/model/2",
      }),
    };
  }),
  mockapi.get("/customization/paging/model/2", (req) => {
    return {
      status: 200,
      body: json({ values: [{ received: "model" }] }),
    };
  }),
]);

Scenarios.RawLRO = passOnSuccess(
  mockapi.put("/customization/lro/raw", (req) => {
    return {
      status: 200,
      body: json({ provisioningState: "Succeeded", received: "raw" }),
    };
  }),
);

Scenarios.HandwrittenModelLRO = passOnSuccess(
  mockapi.put("/customization/lro/model", (req) => {
    return {
      status: 200,
      body: json({ provisioningState: "Succeeded", received: "model" }),
    };
  }),
);
