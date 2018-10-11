import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

// *******************************************************************************
// Pages

import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./welcome/login/login.component";
import {RegistrationComponent} from "./welcome/registration/registration.component";
import {ForgotComponent} from "./welcome/forgot/forgot.component";
import {RecoverySentComponent} from "./welcome/recovery-sent/recovery-sent.component";
import {Successfullycomponent} from "./welcome/successfully/successfullycomponent";

// *******************************************************************************
// Routes

const routes: Routes = [
    {path: '', loadChildren: './welcome/welcome.module#WelcomeModule'},
    {path: 'sign-in', component: LoginComponent},
    {path: 'sign-up', component: RegistrationComponent},
    {path: 'password-reset', component: ForgotComponent},
    {path: 'recovery-email-sent', component: RecoverySentComponent},
    {path: 'successfully', component: Successfullycomponent},
    {path: 'main', loadChildren: './main/main.module#MainModule'},
    {path: '**', component: NotFoundComponent}
];

// *******************************************************************************
//

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
