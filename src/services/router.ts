const HOST = process.env.NEXT_PUBLIC_API_URL as string;

const routes = {
  createSession: {
    method: "POST",
    uri: "/api/v1/admin/auth/token",
  },
  listSellers: {
    method: "GET",
    uri: "/api/v1/admin/seller",
    headers: ["Authorization"],
  },
} as const;

export { HOST, routes };
