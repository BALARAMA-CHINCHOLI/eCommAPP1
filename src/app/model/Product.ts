
export interface APIResponseModel {
    message: any;
    result: any;
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: any,
}

export interface CategoryList{
   categoryId: any;
    price: number,
    title: string,
    category: string,
}


export interface Productlist{
   rate: number,
   count: number
}

export interface rating{
    rate: number,
    count: number
}

export class Customer{
    CustId: number;
    Name: string;
    MobileNo: number;
    Email: string;
    Password: string;
  
    constructor(){
        this.CustId = 0;
        this.Name = '';
        this.MobileNo = 0;
        this.Email = '';
        this.Password = '';
    }
}