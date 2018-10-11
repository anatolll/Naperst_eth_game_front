import {NgModule} from "@angular/core";
import {WelcomeComponent} from "./welcome.component";
import {LoginComponent} from "./login/login.component";
import {ForgotComponent} from "./forgot/forgot.component";
import {HomeComponent} from "./home/home.component";
import {RegistrationComponent} from "./registration/registration.component";
import {TermsComponent} from "./terms/terms.component";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WelcomeRoutingModule} from "./welcome-routing.module";
import {RecoverySentComponent} from "./recovery-sent/recovery-sent.component";
import {FaqComponent} from './faq/faq.component';
import {PolicyComponent} from "./policy/policy.component";
import {FooterComponent} from "./footer/footer.component";
import {LayoutBlankComponent} from "./layout-blank/layout-blank.component";
import {HeaderComponent} from "./header/header.component";
import {SubscribeComponent} from "./subscribe/subscribe.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {CookieComponent} from "./cookie/cookie.component";
import {Successfullycomponent} from "./successfully/successfullycomponent";
import {CookieNotificationComponent} from "./cookie-notification/cookie-notification.component";

@NgModule({
    declarations: [
        LayoutBlankComponent,
        WelcomeComponent,
        HomeComponent,
        LoginComponent,
        ForgotComponent,
        RegistrationComponent,
        TermsComponent,
        PolicyComponent,
        RecoverySentComponent,
        FaqComponent,
        FooterComponent,
        HeaderComponent,
        SubscribeComponent,
        NotFoundComponent,
        CookieComponent,
        Successfullycomponent,
        CookieNotificationComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        WelcomeRoutingModule
    ]
})

export class WelcomeModule {

}