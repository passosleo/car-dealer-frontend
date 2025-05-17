import { ObjectRecursiveOf } from "./types";

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

export function iterateObject<T = string>(
  mapOfIndexes: string[],
  objectOfString: ObjectRecursiveOf<T>
): T | undefined {
  if (objectOfString[mapOfIndexes[0]] === undefined) {
    return undefined;
  }

  if (mapOfIndexes.length <= 1) {
    return objectOfString[mapOfIndexes[0]] as T;
  }

  const newMap = mapOfIndexes.splice(1);
  return iterateObject(
    newMap,
    objectOfString[mapOfIndexes[0]] as ObjectRecursiveOf<T>
  );
}
