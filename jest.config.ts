import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  // testEnvironment: 'jsdom', // -> 이 설정을 아래로 변경
  testEnvironment: "jest-fixed-jsdom",
  // 테스트 전에 실행할 설정 파일을 지정
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // tests-examples 폴더는 실제로 삭제 후 설정에서 삭제하셔도 됩니다.
  testPathIgnorePatterns: ["<rootDir>/e2e/tests/", "<rootDir>/tests-examples/"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
