import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TermsComponent} from "./terms/terms.component";
import {PolicyComponent} from "./policy/policy.component";
import {LayoutBlankComponent} from "./layout-blank/layout-blank.component";
import {HomeComponent} from "./home/home.component";
import {CookieComponent} from "./cookie/cookie.component";

const routes: Routes = [
    {path: '', component: LayoutBlankComponent, children: [
        {'path': '', component: HomeComponent},
        {'path': 'terms-of-use', component: TermsComponent},
        {'path': 'privacy-policy', component: PolicyComponent},
        {'path': 'cookie-policy', component: CookieComponent}
    ]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class WelcomeRoutingModule {

}