import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    isExpanded = false;
    langs: string[];
    currentLang: string;

    constructor(private translate: TranslateService) {
        this.langs = translate.getLangs();
        this.currentLang = translate.currentLang;
    }

    setLang(lang: string) {
        this.currentLang = lang;
        this.translate.use(lang);
    }
}

