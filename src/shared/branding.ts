import pkg from "../../package.json" with { type: "json" };

export const {
  name: APP_NAME,
  productName: APP_PRODUCT_NAME,
  version: APP_VERSION,
} = pkg;
