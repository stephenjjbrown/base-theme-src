export declare class MenuItem {
    id: number;
    title: string;
    url: string;
}
export declare class MenuItemClient {
    getAll(): Promise<MenuItem[]>;
}
