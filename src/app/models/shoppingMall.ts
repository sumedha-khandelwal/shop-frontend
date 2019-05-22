
export interface ShoppingMall{
    id:number,
    name:string,
    ownerName:string,
    shopType:ShopType;
    address:string,
    latitude:string,
    longitude:string
}
enum ShopType {
    GENERAL_STORE,
    MALL,
    SUPERMARKET,
    MEDICAL_STORE
}