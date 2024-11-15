import { HttpClient} from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
//import {ExtendedProductModel } from '../model/Product';
import { Observable } from 'rxjs';
import { APIResponseModel, CategoryList, Customer} from '../model/Product';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {  

  private apiUrl = 'https://fakestoreapi.com/products/';

   // Signal to store product data
   productList = signal<APIResponseModel[]>([]);

   categoryList = signal<CategoryList[]>([]);


  //By using dependency Injection we will create instance of our HTTP
  constructor(private http: HttpClient) { 
   
    effect(() => {
      console.log('Product List Updated:', this.productList());
  });

  effect(()=>{
    console.log('Category List Updated:', this.categoryList());
  })

  }

  fetchProducts() {
    this.http.get<APIResponseModel[]>(this.apiUrl)
        .pipe(
            map(response => response), // Add any transformation if needed
            catchError(error => {
                console.error('Error fetching products', error);
                return of([]); // Return empty array on error
            })
        )
        .subscribe(data => {
            this.productList.set(data); // Set the fetched data into the signal
        });
  }

  fetchCategories(){
      this.http.get<CategoryList[]>(this.apiUrl + "categories")
      .pipe(
        map(response => response), 
        catchError(error => {
            console.error('fetching categories', error);
            return of([]); //Return empty array on error
        })
      )
      .subscribe(data =>{
        this.categoryList.set(data);
      });
  }

  fetchAllProductsByCategoryId(categoryId: number){
    const url = `${this.apiUrl}?limit=5${categoryId}`;
    return this.http.get<APIResponseModel>(url);
  }

  registerNewCustomer(obj: Customer){
    debugger;
    const url = `${this.apiUrl}`;
    return this.http.post<APIResponseModel>(url, obj);
  }
}
