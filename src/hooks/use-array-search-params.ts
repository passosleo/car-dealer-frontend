import {
  useSearchParams as useNextSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";

export function useArraySearchParams<T extends Record<string, string[]>>() {
  const searchParams = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function serializeArray(values: string[]) {
    return values.join(",");
  }

  function deserializeArray(value: string | null): string[] {
    if (!value) return [];
    return value.split(",").filter((v) => v.trim() !== "");
  }

  function addSearchParam<K extends keyof T>(key: K, value: T[K][number]) {
    const params = new URLSearchParams(searchParams.toString());
    const currentRaw = params.get(key as string);
    const current = deserializeArray(currentRaw);

    if (current.includes(value)) return;

    current.push(value);
    params.set(key as string, serializeArray(current));
    router.push(`?${params.toString()}`);
  }

  function removeSearchParam<K extends keyof T>(key: K, value?: T[K][number]) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      const current = deserializeArray(params.get(key as string));
      const updated = current.filter((v) => v !== value);

      if (updated.length === 0) {
        params.delete(key as string);
      } else {
        params.set(key as string, serializeArray(updated));
      }
    } else {
      params.delete(key as string);
    }

    router.push(params.toString() ? `?${params.toString()}` : pathname);
  }

  function addSearchParams(paramsObject: Partial<T>) {
    const params = new URLSearchParams(searchParams.toString());
    let hasChanged = false;

    Object.entries(paramsObject).forEach(([key, values]) => {
      const stringKey = key as string;
      const existing = deserializeArray(params.get(stringKey));

      if (!values || values.length === 0) {
        if (existing.length > 0) {
          params.delete(stringKey);
          hasChanged = true;
        }
        return;
      }

      const valuesChanged =
        values.length !== existing.length ||
        values.some((v: string) => !existing.includes(v));

      if (valuesChanged) {
        params.set(stringKey, serializeArray(values));
        hasChanged = true;
      }
    });

    if (hasChanged) {
      router.push(`?${params.toString()}`);
    }
  }

  function clearAllSearchParams() {
    if (searchParams.toString() === "") return;
    router.push(pathname);
  }

  function clearSearchParams(keys: (keyof T)[]) {
    const params = new URLSearchParams(searchParams.toString());
    let hasChanged = false;

    keys.forEach((key) => {
      const stringKey = key as string;
      if (params.has(stringKey)) {
        params.delete(stringKey);
        hasChanged = true;
      }
    });

    if (hasChanged) {
      router.push(params.toString() ? `?${params.toString()}` : pathname);
    }
  }

  function getAllSearchParams(): Partial<T> {
    const result: Partial<T> = {};
    Array.from(searchParams.keys()).forEach((key) => {
      result[key as keyof T] = deserializeArray(
        searchParams.get(key)
      ) as T[keyof T];
    });
    return result;
  }

  function getSearchParams(keys: (keyof T)[]): Partial<T> {
    const result: Partial<T> = {};
    keys.forEach((key) => {
      const values = deserializeArray(searchParams.get(key as string));
      if (values.length > 0) {
        result[key] = values as T[typeof key];
      }
    });
    return result;
  }

  function getSearchParam<K extends keyof T>(key: K): T[K] {
    return deserializeArray(searchParams.get(key as string)) as T[K];
  }

  function isUrlParamsEmpty() {
    return Array.from(searchParams.keys()).length === 0;
  }

  return {
    addSearchParam,
    addSearchParams,
    removeSearchParam,
    clearSearchParams,
    clearAllSearchParams,
    getAllSearchParams,
    getSearchParam,
    getSearchParams,
    isUrlParamsEmpty: isUrlParamsEmpty(),
  };
}
