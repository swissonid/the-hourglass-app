export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      NEXTAUTH_SECRET: string;
      IS_NOT_PREVIEW: boolean;
    }
  }
}
