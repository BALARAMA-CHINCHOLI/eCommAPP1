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

  //"dummy.json"
  //apiUrl: string = 'https://fakestoreapi.com/products/1';


  //Online converted "dummy.json" to JSON online editor"https://jsoneditoronline.org/#left=local.hepupo" then  
  //tested in Swagger "https://petstore.swagger.io/#/store/placeOrder" and again tested in Postman. 
  
  //apiUrl: string = 'https://petstore.swagger.io/v2/store/order';
  

  //Used this dummy data without testing in 'postman/swagger'
  private apiUrl = 'https://fakestoreapi.com/products/';

   //chatGPT Ref: seaFood dummy data:()  
  //private apiUrl = 'https://api.websitecarbon.com/';



   // Signal to store product data
   productList = signal<APIResponseModel[]>([]);

   categoryList = signal<CategoryList[]>([]);


  //By using dependency Injection we will create instance of our HTTP
  constructor(private http: HttpClient) { 
   
    effect(() => {
      console.log('Product List Updated:', this.productList());
  });

  /*effect() is designed to track changes to reactive signals or perform actions 
     (like logging or triggering additional methods) based on those changes. For more check below link
     [ChatGPT-'https://chatgpt.com/c/672dc7a1-e924-8000-b314-5881860c6c5e'].
  */
  effect(()=>{
    console.log('Category List Updated:', this.categoryList());
  })

  }

  //this function returning data type of observable
  //getAllProducts(): Observable<APIResponseModel> {

  //Issue: Type 'Observable<Object>' is not assignable to type 'Observable<APIResponseModel>'.
  //Resolved: Here we need to metion the which type of data type we are getting 'get<APIResponseModel>'
  //return this.http.get<APIResponseModel>(this.apiUrl + "order");
  //}
  


/*Error: effect() can only be used within an injection context such as a constructor, a factory function, 
a field initializer, or a function used with `runInInjectionContext` */
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

  /*Working: Here catagory size button text is very large to reduce text size transfer into 'shortenCategoryName'.*/
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



  /* To reduce button text size by using 'shortenCategoryName'
  fetchCategories(): Observable<CategoryList[]>{
    return this.http.get<CategoryList[]>('https://fakestoreapi.com/products/categories').pipe(
      map(categories =>
        categories.map(category => this.shortenCategoryName(category))
      )
    );
  }

  private shortenCategoryName(category: CategoryList): CategoryList{
     switch(category){
      case "men's clothing":
        return "Men's Wear";
      case "women's clothing":
        return "Women's Wear";
      case "electronics":
        return "Electronics";
      case "jewelery":
        return "Jewelry";
      default:
        return category;
     }
  }
  */

  fetchAllProductsByCategoryId(categoryId: number){
    const url = `${this.apiUrl}?limit=5${categoryId}`;
    return this.http.get<APIResponseModel>(url);
  }

  //Here get the 'obj and data type Customer' and we need to use post i.e two parameters "URL and object"
  registerNewCustomer(obj: Customer){
    debugger;
    const url = `${this.apiUrl}`;
    return this.http.post<APIResponseModel>(url, obj);
  }
}
