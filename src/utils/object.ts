export function replaceEmptyWithNull<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map((item) => replaceEmptyWithNull(item)) as unknown as T;
  } else if (data && typeof data === "object") {
    if (data instanceof Date) {
      const timezoneOffset = new Date().getTimezoneOffset();
      return new Date(data.getTime() - timezoneOffset * 60000) as unknown as T;
    }
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === "" || value === undefined || value === 0
          ? null
          : replaceEmptyWithNull(value),
      ])
    ) as T;
  }
  return data;
}
