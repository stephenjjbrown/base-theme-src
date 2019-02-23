declare class SessionCache {
    get(key: string): string;
    set(key: string, value: string): void;
    remove(key: string): void;
}
export declare const sessionCache: SessionCache;
export {};
