export interface IContact {
    email: string;
    group?: string;
    name: string;
    telephone?: string[];
    user?: string;
    __v?: number;
    _id?: string;
    address: IAddress[];
}
  
export interface IAddress {
    city: string;
    complement?: string;
    district: string;
    number: string;
    state: string;
    street: string;
    zipcode: string;
    _id?: string;
}