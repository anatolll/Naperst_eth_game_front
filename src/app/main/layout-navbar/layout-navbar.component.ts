import {Component, Input, HostBinding} from '@angular/core';
import {AppService} from '../../app.service';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {MainService} from "../../main.service";
import {AuthService} from "../../shared/services/auth.service";
import {UserInfoModel} from "../../shared/models/userInfo.model";

@Component({
    selector: 'app-layout-navbar',
    templateUrl: './layout-navbar.component.html',
    styles: [':host { display: block; }']
})
export class LayoutNavbarComponent {
    userInfo: UserInfoModel;
    isExpanded = false;
    isRTL: boolean;
    langs: string[];
    currentLang: string;

    @Input() sidenavToggle = true;

    @HostBinding('class.layout-navbar') private hostClassMain = true;

    constructor(
        private appService: AppService,
        private mainService: MainService,
        private translate: TranslateService,
        private router: Router,
        private authService: AuthService
    ) {
        this.userInfo = appService.userInfo;
        this.isRTL = appService.isRTL;
        this.langs = translate.getLangs();
        this.currentLang = translate.currentLang;
    }

    currentBg() {
        return `bg-${this.appService.layoutNavbarBg}`;
    }

    toggleSidenav() {
        this.mainService.toggleCollapsed();
    }

    getCurrentLanguage() {
        return this.translate.currentLang;
    }

    getLanguages() {
        return this.translate.getLangs();
    }

    setLanguage(lang: string) {
        this.translate.setDefaultLang(lang);
        this.translate.use(lang);
    }

    setLang(lang: string) {
        this.currentLang = lang;
        this.translate.use(lang);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/'])
    }
}
