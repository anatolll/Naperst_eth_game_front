import {NgModule} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        TranslateModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class SharedModule {
    public langs = ['en', 'cn'];
    public defaultLang = 'en';
    constructor(public translate: TranslateService) {
        translate.addLangs(this.langs);
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|cn/) ? browserLang : 'en');
    }
}
