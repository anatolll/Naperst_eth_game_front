import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {WelcomeModule} from "./welcome/welcome.module";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";

// *******************************************************************************
// NgBootstrap

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// *******************************************************************************
// App

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppService} from './app.service';
import {AuthService} from "./shared/services/auth.service";
import {AuthGuard} from "./shared/services/auth.guard";
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CommonModule} from '@angular/common';
import {SharedModule} from "./shared/shared.module";
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";

// *******************************************************************************
// Pages

import {LayoutBlankComponent} from "./main/layout-blank/layout-blank.component";
import {HoverDropdownModule} from "../vendor/libs/hover-dropdown/hover-dropdown.module";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


// *******************************************************************************
//

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

@NgModule({
    declarations: [
        AppComponent,
        LayoutBlankComponent
    ],

    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(),
        // App
        AppRoutingModule,
        NgbModule,
        NgxDatatableModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        SharedModule,
        WelcomeModule,
        ConfirmationPopoverModule.forRoot({
            cancelButtonType: 'default btn-sm',
            confirmButtonType: 'primary btn-sm'
        }),
        HoverDropdownModule
    ],

    providers: [
        Title,
        AppService,
        TranslateService,
        AuthService,
        AuthGuard
    ],

    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
