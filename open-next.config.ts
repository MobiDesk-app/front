import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig(),
  // `npm run build` runs the OpenNext build (that's what Cloudflare calls),
  // so OpenNext itself must call Next directly to avoid recursing.
  buildCommand: "npx next build",
};
