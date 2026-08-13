import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const coreRoot = fileURLToPath(new URL("..", import.meta.url));

const requiredFolders = ["doctrine", "runtime", "sdk"];

describe("core folders", () => {
  it("exists for the expected top-level directories", () => {
    for (const folder of requiredFolders) {
      expect(existsSync(join(coreRoot, folder)), `Require folder '${folder}' does not exist`).toBe(true);
    }
  });
});
