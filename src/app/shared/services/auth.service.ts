import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UserInfoModel} from "../models/userInfo.model";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
    private userInfo: UserInfoModel;

    constructor(
        private appService: AppService,
        private http: HttpClient,
        private router: Router
    ) {
        this.userInfo = new UserInfoModel();
    }

    public login(data: any) {
        let postData = {login: data.email, password: data.password};
        let headers = {headers: new HttpHeaders().set("Content-Type", "application/json")};
        this.http.post(this.appService.apiUrl + 'user/login', postData, headers)
            .subscribe((response) => {
                if (response['success']) {
                    this.setItem('uid', response['uid']);
                    this.setItem('name', response['name']);
                    this.setItem('userName', response['userName']);
                    this.setItem('email', response['email']);
                    this.setItem('token', response['token']);
                    this.setItem('ip', response['ip']);
                    this.setItem('avatar', response['avatar']);
                    this.setItem('isAuth', response['isAuth']);
                    this.router.navigate(['/main'])
                }
            });
    }

    logout() {
        this.userInfo.uid = '';
        this.userInfo.name = '';
        this.userInfo.userName = '';
        this.userInfo.email = '';
        this.userInfo.token = '';
        this.userInfo.ip = '';
        this.userInfo.avatar = '';
        this.userInfo.isAuth = false;

        window.localStorage.clear();
    }

    isLoggedIn() {
        return this.userInfo.isAuth;
    }

    setItem(key: string, value: string) {
        this.userInfo[key] = value;
        window.localStorage.setItem(key, value);
    }
}