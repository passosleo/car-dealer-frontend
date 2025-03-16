import { cookies } from "next/headers";

export async function useServerSession() {
  const cookieStore = await cookies();

  async function getTokens() {
    const accessToken = cookieStore.get("accessToken");
    const refreshToken = cookieStore.get("refreshToken");
    return {
      accessToken: accessToken?.value,
      refreshToken: refreshToken?.value,
    };
  }

  return { getTokens };
}
