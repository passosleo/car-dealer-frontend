const HOST = process.env.NEXT_PUBLIC_API_URL as string;

const routes = {
  createSession: {
    method: "POST",
    uri: "/api/v1/admin/auth/token",
  },
  sendRecoverPasswordEmail: {
    method: "POST",
    uri: "/api/v1/admin/auth/recover-password/send",
  },
  listSellers: {
    method: "GET",
    uri: "/api/v1/admin/seller",
    headers: ["Authorization"],
  },
} as const;

export { HOST, routes };
