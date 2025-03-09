import {
  useSearchParams as useNextSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";

export function useSearchParams<T extends Record<string, string>>() {
  const searchParams = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function addSearchParam<K extends keyof T>(key: K, value: T[K]) {
    const paramExistsWithSameValue =
      searchParams.has(key as string) &&
      searchParams.get(key as string) === String(value);
    if (paramExistsWithSameValue) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set(key as string, String(value));
    router.push(`?${params.toString()}`);
  }

  function removeSearchParam<K extends keyof T>(key: K) {
    const paramExists = searchParams.has(key as string);
    if (!paramExists) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key as string);
    router.push(params.toString() ? `?${params.toString()}` : pathname);
  }

  function addSearchParams(paramsObject: Partial<T>) {
    const params = new URLSearchParams(searchParams.toString());
    let hasChanged = false;

    Object.entries(paramsObject).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        if (params.has(key)) {
          params.delete(key);
          hasChanged = true;
        }
      } else {
        const stringValue = String(value);
        if (!params.has(key) || params.get(key) !== stringValue) {
          params.set(key, stringValue);
          hasChanged = true;
        }
      }
    });

    if (hasChanged) {
      router.push(`?${params.toString()}`);
    }
  }

  function clearAllSearchParams() {
    const hasNoParams = searchParams.toString() === "";
    if (hasNoParams) return;
    router.push(pathname);
  }

  function clearSearchParams(keys: (keyof T)[]) {
    const params = new URLSearchParams(searchParams.toString());
    let hasChanged = false;

    keys.forEach((key) => {
      if (params.has(key as string)) {
        params.delete(key as string);
        hasChanged = true;
      }
    });

    if (hasChanged) {
      router.push(params.toString() ? `?${params.toString()}` : pathname);
    }
  }

  function getAllSearchParams(): Partial<T> {
    const params: Partial<T> = {};
    searchParams.forEach((value, key) => {
      params[key as keyof T] = value as T[keyof T];
    });
    return params;
  }

  function getSearchParams(keys: (keyof T)[]): Partial<T> {
    const params: Partial<T> = {};
    keys.forEach((key) => {
      const value = searchParams.get(key as string);
      if (value !== null) {
        params[key] = value as T[typeof key];
      }
    });
    return params;
  }

  function getSearchParam(key: keyof T): T[typeof key] | undefined {
    return searchParams.get(key as string) as T[typeof key] | undefined;
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
  };
}
