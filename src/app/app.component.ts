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
  imports: [CommonModule, ProductsComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eCommAPP';

  @ViewChild("registerModel") registerModel: ElementRef | undefined;

  registerobj: Customer = new Customer();

  masterService = inject(MasterService);


  openRegisterModel() {
    if (this.registerModel) {
      this.registerModel.nativeElement.style.display = "block";
    }
  }

  closeRegisterModel() {
    if (this.registerModel) {
      this.registerModel.nativeElement.style.display = "none";
    }
  }

  registerForm() {
    debugger;
    this.masterService.registerNewCustomer(this.registerobj).subscribe((res: APIResponseModel) => {
      if (res.result) {
        alert("user Register success");
        this.closeRegisterModel();
      } else {
        alert(res.message);
      }
    })
  }
}
