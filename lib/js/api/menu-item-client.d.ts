export declare class MenuItem {
    title: string;
    url: string;
}
export declare class MenuItemClient {
    getAll(): Promise<MenuItem[]>;
}
