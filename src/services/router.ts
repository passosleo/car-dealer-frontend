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
  getSellerById: {
    method: "GET",
    uri: "/api/v1/admin/seller/:sellerId",
    headers: ["Authorization"],
  },
  createSeller: {
    method: "POST",
    uri: "/api/v1/admin/seller",
    headers: ["Authorization"],
  },
  updateSeller: {
    method: "PUT",
    uri: "/api/v1/admin/seller/:sellerId",
    headers: ["Authorization"],
  },
  deleteSeller: {
    method: "DELETE",
    uri: "/api/v1/admin/seller/:sellerId",
    headers: ["Authorization"],
  },
  listBrands: {
    method: "GET",
    uri: "/api/v1/admin/brand",
    headers: ["Authorization"],
  },
  getBrandById: {
    method: "GET",
    uri: "/api/v1/admin/brand/:brandId",
    headers: ["Authorization"],
  },
  createBrand: {
    method: "POST",
    uri: "/api/v1/admin/brand",
    headers: ["Authorization"],
  },
  updateBrand: {
    method: "PUT",
    uri: "/api/v1/admin/brand/:brandId",
    headers: ["Authorization"],
  },
  deleteBrand: {
    method: "DELETE",
    uri: "/api/v1/admin/brand/:brandId",
    headers: ["Authorization"],
  },
  listProfiles: {
    method: "GET",
    uri: "/api/v1/admin/profile",
    headers: ["Authorization"],
  },
  getProfileById: {
    method: "GET",
    uri: "/api/v1/admin/profile/:profileId",
    headers: ["Authorization"],
  },
  createProfile: {
    method: "POST",
    uri: "/api/v1/admin/profile",
    headers: ["Authorization"],
  },
  updateProfile: {
    method: "PUT",
    uri: "/api/v1/admin/profile/:profileId",
    headers: ["Authorization"],
  },
  deleteProfile: {
    method: "DELETE",
    uri: "/api/v1/admin/profile/:profileId",
    headers: ["Authorization"],
  },
  listRoles: {
    method: "GET",
    uri: "/api/v1/admin/role",
    headers: ["Authorization"],
  },
  listUsers: {
    method: "GET",
    uri: "/api/v1/admin/user",
    headers: ["Authorization"],
  },
  getUserById: {
    method: "GET",
    uri: "/api/v1/admin/user/:userId",
    headers: ["Authorization"],
  },
  createUser: {
    method: "POST",
    uri: "/api/v1/admin/user",
    headers: ["Authorization"],
  },
  updateUser: {
    method: "PUT",
    uri: "/api/v1/admin/user/:userId",
    headers: ["Authorization"],
  },
  deleteUser: {
    method: "DELETE",
    uri: "/api/v1/admin/user/:userId",
    headers: ["Authorization"],
  },
} as const;

export { HOST, routes };
