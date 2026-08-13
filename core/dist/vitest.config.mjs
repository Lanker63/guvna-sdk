import { defineConfig } from "vitest/config";
export default defineConfig({
    test: {
        include: ["tests/**/*.test.ts"],
        coverage: {
            enabled: false
        }
    }
});
//# sourceMappingURL=vitest.config.mjs.map