export interface IUsers {
    name: string,
    email: string,
    telephone: string[],
    address: IAdress[],
    group: IGroup,
};

export interface IAdress { 
    zipcode: string,
    street: string,
    district: string,
    state: string,
    city: string,
    complement: string;
}

export interface IGroup {
    name: string;
    user: string;
}