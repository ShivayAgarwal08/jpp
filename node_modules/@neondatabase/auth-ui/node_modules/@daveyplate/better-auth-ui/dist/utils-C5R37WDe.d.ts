declare function getViewByPath<T extends object>(viewPaths: T, path?: string): Extract<keyof T, string> | undefined;

export { getViewByPath as g };
