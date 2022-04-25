import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  conditionProduct: string[] = ["New", "Second Hand", "B/Y"]
  productForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef:MatDialogRef<DialogComponent>) {}
 
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ["", Validators.required],
      category: ["", Validators.required],
      condition: [""],
      price: [""],
      comment: [""],
      date: [""],
    })
  }
  addProduct() {
     console.log(this.productForm.value)
    if(this.productForm.valid) {
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:() => { 
          alert("Product was added succsessfully")
          this.productForm.reset()
          this.dialogRef.close("save")
        },
        error:() => {
          alert("Something went wrong whi le ading")
        }
      }) 
    }
  }
}


