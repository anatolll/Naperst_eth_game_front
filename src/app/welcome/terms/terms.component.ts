import {Component} from '@angular/core';
import {AppService} from "../../app.service";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    styleUrls: ['./terms.component.scss']
})
export class TermsComponent {

    langs: string[];
    currentLang: string;

    constructor(
        private appService: AppService,
        private translate: TranslateService,
        private route: ActivatedRoute
    ) {
        this.appService.pageTitle = 'Home';
        this.langs = translate.getLangs();
        this.currentLang = translate.currentLang;
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
}
