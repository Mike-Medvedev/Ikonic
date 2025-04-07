export function toCamelCase(data: any): any {
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data);
      return toCamelCase(parsed);
    } catch {
      return data;
    }
  }

  if (Array.isArray(data)) {
    return data.map(toCamelCase);
  }

  if (data !== null && typeof data === "object") {
    return Object.entries(data).reduce((acc, [key, value]) => {
      const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
      acc[camelKey] = toCamelCase(value);
      return acc;
    }, {} as Record<string, any>);
  }

  return data;
}

export function toSnakeCase(data: any): any {
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data);
      return toSnakeCase(parsed);
    } catch {
      return data;
    }
  }

  if (Array.isArray(data)) {
    return data.map(toSnakeCase);
  }

  if (data !== null && typeof data === "object") {
    return Object.entries(data).reduce((acc, [key, value]) => {
      const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      acc[snakeKey] = toSnakeCase(value);
      return acc;
    }, {} as Record<string, any>);
  }

  return data;
}
