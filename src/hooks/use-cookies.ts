export function useCookies() {
  function setCookie(
    key: string,
    value: string | number | boolean,
    config: {
      path?: string;
      expires?: Date | null;
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax" | "none";
    } = {
      path: "/",
      expires: null,
      secure: false,
      httpOnly: false,
      sameSite: "none",
    }
  ) {
    try {
      if (typeof document !== "undefined") {
        let cookieString = `${key}=${encodeURIComponent(value)}; path=${
          config.path
        }`;

        if (!!config.expires) {
          cookieString += `; expires=${config.expires.toUTCString()}`;
        }

        if (config.secure) cookieString += "; Secure";
        if (config.sameSite) cookieString += `; SameSite=${config.sameSite}`;

        document.cookie = cookieString;
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  function getCookie(key: string) {
    try {
      if (typeof document !== "undefined") {
        const cookies = document.cookie
          .split(";")
          .map((cookie) => cookie.trim());
        for (const cookie of cookies) {
          const [cookieKey, cookieValue] = cookie.split("=");
          if (cookieKey === key) {
            return decodeURIComponent(cookieValue);
          }
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  function invalidateCookie(key: string) {
    try {
      if (typeof document !== "undefined") {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  return { setCookie, getCookie, invalidateCookie };
}
