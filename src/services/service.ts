export class Service {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected buildUrlWithQueryParams(
    baseUrl: string,
    query: Record<string, any>
  ): string {
    if (!query) {
      return baseUrl;
    }

    const queryParams = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    }

    return `${baseUrl}?${queryParams.toString()}`;
  }
}
