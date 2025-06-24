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
  getUserInfo: {
    method: "GET",
    uri: "/api/v1/admin/auth/user-info",
    headers: ["Authorization"],
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
  listCategories: {
    method: "GET",
    uri: "/api/v1/admin/category",
    headers: ["Authorization"],
  },
  getCategoryById: {
    method: "GET",
    uri: "/api/v1/admin/category/:categoryId",
    headers: ["Authorization"],
  },
  createCategory: {
    method: "POST",
    uri: "/api/v1/admin/category",
    headers: ["Authorization"],
  },
  updateCategory: {
    method: "PUT",
    uri: "/api/v1/admin/category/:categoryId",
    headers: ["Authorization"],
  },
  deleteCategory: {
    method: "DELETE",
    uri: "/api/v1/admin/category/:categoryId",
    headers: ["Authorization"],
  },
  listBanners: {
    method: "GET",
    uri: "/api/v1/admin/banner",
    headers: ["Authorization"],
  },
  getBannerById: {
    method: "GET",
    uri: "/api/v1/admin/banner/:bannerId",
    headers: ["Authorization"],
  },
  createBanner: {
    method: "POST",
    uri: "/api/v1/admin/banner",
    headers: ["Authorization"],
  },
  updateBanner: {
    method: "PUT",
    uri: "/api/v1/admin/banner/:bannerId",
    headers: ["Authorization"],
  },
  deleteBanner: {
    method: "DELETE",
    uri: "/api/v1/admin/banner/:bannerId",
    headers: ["Authorization"],
  },
  listVehicles: {
    method: "GET",
    uri: "/api/v1/admin/vehicle",
    headers: ["Authorization"],
  },
  getVehicleById: {
    method: "GET",
    uri: "/api/v1/admin/vehicle/:vehicleId",
    headers: ["Authorization"],
  },
  createVehicle: {
    method: "POST",
    uri: "/api/v1/admin/vehicle",
    headers: ["Authorization"],
  },
  updateVehicle: {
    method: "PUT",
    uri: "/api/v1/admin/vehicle/:vehicleId",
    headers: ["Authorization"],
  },
  deleteVehicle: {
    method: "DELETE",
    uri: "/api/v1/admin/vehicle/:vehicleId",
    headers: ["Authorization"],
  },
  listActiveVehicles: {
    method: "GET",
    uri: "/api/v1/public/vehicle",
  },
  listActiveCategories: {
    method: "GET",
    uri: "/api/v1/public/category",
  },
  listActiveBrands: {
    method: "GET",
    uri: "/api/v1/public/brand",
  },
  listActiveSellers: {
    method: "GET",
    uri: "/api/v1/public/seller",
  },
  listLayoutComponents: {
    method: "GET",
    uri: "/api/v1/admin/layout",
    headers: ["Authorization"],
  },
} as const;

export { HOST, routes };
