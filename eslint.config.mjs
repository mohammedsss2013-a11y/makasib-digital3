import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // تجاهل الملفات والمجلدات الخاصة بالبناء والمخرجات
  globalIgnores([
    ".next/**",
    ".unlighthouse/**", // تقارير أداء unlighthouse غير الضرورية للفحص
    "out/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "next-env.d.ts",
    "**/*.js", // استبعاد ملفات JS في حال التركيز على TypeScript فقط
  ]),
]);

export default eslintConfig;