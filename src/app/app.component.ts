import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { APIResponseModel, Customer } from './model/Product';
import { FormsModule } from '@angular/forms';
import { MasterService } from './service/master.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ProductsComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eCommAPP';

  //Issue: Property 'registerModel' has no initializer and is not definitely assigned in the constructor 
  //Resolved: The data type is 'ElementRef need to mention undefind': "ElementRef | undefined" 
  @ViewChild("registerModel") registerModel: ElementRef | undefined;


  //It will initialize the constructor and all the values initialize
  registerobj: Customer = new Customer();

  //Create a Template Form need to initialize the 'FormSModule' to use [(ngModel)]
  //Injecting service for user registration
  masterService = inject(MasterService);


  openRegisterModel() {
    if (this.registerModel) {
      //changing the 'CSS' style dynamicaly
      this.registerModel.nativeElement.style.display = "block";
    }
  }

  closeRegisterModel() {
    //This is checking the popup modal existing or not "if(this.registerModel)"  
    if (this.registerModel) {
      //changing the 'CSS' style dynamically
      this.registerModel.nativeElement.style.display = "none";
    }
  }

  registerForm() {
    debugger;
    this.masterService.registerNewCustomer(this.registerobj).subscribe((res:APIResponseModel)=>{
      if(res.result){
        alert("user Register success");
        this.closeRegisterModel();
      }else{
        alert(res.message);
      }
    })
  }
}
