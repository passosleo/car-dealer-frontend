export function replaceEmptyWithNull<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map((item) => replaceEmptyWithNull(item)) as unknown as T;
  } else if (data && typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === "" || value === undefined
          ? null
          : replaceEmptyWithNull(value),
      ])
    ) as T;
  }
  return data;
}
