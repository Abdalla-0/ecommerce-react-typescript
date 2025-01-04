// export type TProduct = {
//     [x: string]: React.ReactNode;
//     id: number, title: string, cat_prefix: string, img: string, price: number,
//     max: number, quantity?: number, isLiked?: boolean, isAuthenticated?: boolean,
//     changeQuantityHandler?: (id: number, quantity: number) => void,
//     removeItemHandler?: (id: number) => void,
// };

export type TProduct = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: React.ReactNode | ((...args: any[]) => void);
    id: number;
    title: string;
    cat_prefix: string;
    img: string;
    price: number;
    max: number;
    quantity?: number;
    isLiked?: boolean;
    isAuthenticated?: boolean;
    changeQuantityHandler?: (id: number, quantity: number) => void;
    removeItemHandler?: (id: number) => void;
};