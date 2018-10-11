import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AppService} from "../../app.service";

@Component({
    selector: 'app-terms',
    templateUrl: './policy.component.html',
    styleUrls: ['./policy.component.scss']
})
export class PolicyComponent {

    langs: string[];
    currentLang: string;

    constructor(
        private appService: AppService,
        private translate: TranslateService
    ) {
        this.appService.pageTitle = 'Home';
        this.langs = translate.getLangs();
        this.currentLang = translate.currentLang;
    }
    setLang(lang: string) {
        this.currentLang = lang;
        this.translate.use(lang);
    }

}
