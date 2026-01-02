import type { LoginCredentials, LoginResponse } from "./types";

const DEMO_EMAIL = "abdullah-admin";
const DEMO_PASSWORD = "admin123";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fakeLogin(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  await wait(700);

  const isDemoUser =
    credentials.email === DEMO_EMAIL && credentials.password === DEMO_PASSWORD;

  if (!isDemoUser) {
    throw new Error("Invalid email or password");
  }

  return {
    token: "fake-admin-token",
  };
}

export const demoCredentials = {
  email: DEMO_EMAIL,
  password: DEMO_PASSWORD,
};
