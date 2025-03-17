const HOST = process.env.NEXT_PUBLIC_API_URL as string;

const routes = {
  createSession: {
    method: "POST",
    uri: "/api/v1/admin/auth/token",
  },
} as const;

export { HOST, routes };
