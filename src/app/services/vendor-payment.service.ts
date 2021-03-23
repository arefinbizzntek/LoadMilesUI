import { VendorPayment } from './../model/vendor-payment';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { AuthHeaderService } from '../views/authheader.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class VendorPaymentService {

    vendorpaymenturl: string;
    constructor(private http: Http, private _headerService: AuthHeaderService) {
        this.vendorpaymenturl = environment.vendorpaymenturl;
    }

    SendForm(vendorpayment) {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.post(this.vendorpaymenturl, vendorpayment, options).pipe(map(response => response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    getVendorPaymentData() {
        let options = new RequestOptions({ headers: this._headerService.getHeader() });
        return this.http.get(this.vendorpaymenturl, options).pipe(map(response => response.json().data ? [] : response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }

    // EditVendor(obj) {
    //     let options = new RequestOptions({ headers: this._headerService.getHeader() });
    //     return this.http.put(this.vendorurl, obj, options).pipe(map(response => response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    // }

    // DeleteVendor(_id) {
    // let options = new RequestOptions({ headers: this._headerService.getHeader() });
    // return this.http.delete(this.vendorurl+"/"+_id,options).pipe(map(response=>response.json()),catchError((error:Response)=>{return observableThrowError(error);}));
    // }
}