import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product }from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
url:string ="http://chapayom.codehansa.com/crud_person.php?";

  constructor(private http:HttpClient) { }

getProduct(){
  return this.http.get<Product[]>(this.url+"cmd=select");
}

createProduct(data){
let promise = new Promise((resolve, reject) => {
  let apiURL = this.url + "cmd=insert";
  this.http.post(apiURL,data)
  .toPromise()
  .then(
    res => { console.log(res);
  resolve(data);
    }
  );
});
return promise;
  }

  deleteProduct(personID:any){
    let promise = new Promise((resolve, reject) => {
      let apiURL = this.url + "cmd=delete";
      this.http.post(apiURL,personID)
      .toPromise()
      .then(
        res => { console.log(res);
      resolve(personID);
        }
      );
    });
    console.log(personID);
    return promise
  }

  getOnePerson(personID) {
    return this.http.get<Product[]>(this.url + 'cmd=select&personID=' + personID);
  }
  
  updateProduct(data){
    let promise = new Promise((resolve, reject)=>{
      let apiURL = this.url + "cmd=update";
      this.http.post(apiURL,data).toPromise().then(
        res => {
          console.log(res);
          resolve(data);
        }
      );
    });
    return promise;
  }
  
}