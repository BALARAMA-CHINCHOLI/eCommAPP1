import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { APIResponseModel, CategoryList, Productlist } from '../../model/Product';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  masterService = inject(MasterService)

  productlist = signal<Productlist[]>([]);

  categoryLists$: Observable<CategoryList[]> = new Observable<CategoryList[]>()


  products$ = this.masterService.productList;


  categorys$ = this.masterService.categoryList;


  ngOnInit(): void {
    this.masterService.fetchProducts(); // Fetch products on component initialization

    this.masterService.fetchCategories();
  }

  fetchAllProductsByCategoryId(id: number) {
    this.masterService.fetchAllProductsByCategoryId(id).subscribe((res: APIResponseModel) => {
      this.productlist.set(res.rating);
    })
  }
}
