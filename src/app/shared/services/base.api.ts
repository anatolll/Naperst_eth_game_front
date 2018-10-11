import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

export class BaseApi {

    private url = "http://api.birofit.com/";
    private token: string = window.localStorage.getItem("token");
    private headers = {headers: new HttpHeaders().set("Authorization", this.token)};

    constructor(public http: HttpClient) {}

    private getUrl(path: string = ''): string {
        return this.url + path;
    }

    public get(path: string = ''): Observable<any> {
        return this.http.get(this.getUrl(path));
    }

    public post(path: string = '', postData: any): Observable<any> {
        return this.http.post(this.getUrl(path), postData, this.headers);
    }

    public put(path: string, putData: any): Observable<any> {
        return this.http.put(this.getUrl(path), putData, this.headers);
    }
}