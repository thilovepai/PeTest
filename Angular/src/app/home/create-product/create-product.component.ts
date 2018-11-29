import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {ProductService}  from'../../service/product.service';
import{AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateproductComponent implements OnInit {

  errorMsg: string;
form: FormGroup;
personID: any;
items: any;
errMsg: string;

constructor(private builder: FormBuilder,
  private router: Router,
  private productSV: ProductService,
  private activateRouter: ActivatedRoute,
  private alertSV: AlertService) 
  { this.initialCreateFormData(),this.activateRouter.params.forEach(
    params => {
      this.personID = params.id;
    }
  ),
  this.initialUpdateFormData()
  ;}//เรียกใช้เมธอด
  ngOnInit() {
  }

  private initialCreateFormData(){
    this.form = this.builder.group({
      citizenID: ['',[Validators.required]],
      name: ['',[Validators.required]],
      lastname:'',
      email: ['',[Validators.required]],
      gender: '',
      name_eng: '',
      lastname_eng: '',
      personID:['']
    });
  }
  private initialUpdateFormData() {
    if (!this.personID) { return; }
    this.productSV.getOnePerson(this.personID)
      .subscribe((data => {
        this.items = data;
        const form = this.form;
        form.controls['personID'].setValue(this.items.rs[0].personID);
        form.controls['citizenID'].setValue(this.items.rs[0].citizenID);
        form.controls['name'].setValue(this.items.rs[0].name);
        form.controls['lastname'].setValue(this.items.rs[0].lastname);
        form.controls['email'].setValue(this.items.rs[0].email);

      }));

  }
  onSubmit() {
    const patt = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/i;
    if (this.form.invalid) {
      console.log('ข้อมูลไม่ครบ');
    } else if (patt.test(this.form.get('email').value) === false) {
      console.log('email ผิดพลาด');
    } else if (this.form.get('personID').value === '') {
      this.productSV
        .createProduct(JSON.stringify(this.form.value))
        .then(res => {
          this.alertSV.notify('เพิ่มข้อมูลเรียบร้อยแล้ว','info')
          this.router.navigate(['/', 'home']);
        })
        .catch(err => this.errorMsg = err);
    } //แก้ไข
    else if (this.form.get('personID').value !== '') {
      this.productSV
        .updateProduct(JSON.stringify(this.form.value))
        .then(res => {
          this.alertSV.notify('แก้ไขข้อมูลเรียบร้อยแล้ว','info')
          this.router.navigate(['/', 'home']);
        })
        .catch(err => this.errorMsg = err);
    }
  }
}