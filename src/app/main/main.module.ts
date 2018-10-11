import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';


// *******************************************************************************
// Layouts

import {LayoutWithoutSidenavComponent} from './layout-without-sidenav/layout-without-sidenav.component';

// *******************************************************************************
// Components

import {LayoutNavbarComponent} from './layout-navbar/layout-navbar.component';
import {LayoutFooterComponent} from './layout-footer/layout-footer.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {ReportsComponent} from "./reports/reports.component";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";

// *******************************************************************************
// Libs

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SidenavModule} from '../../vendor/libs/sidenav/sidenav.module';


// *******************************************************************************
// Services

import {SharedModule} from "../shared/shared.module";
import {MainService} from "../main.service";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {MainRoutingModule} from "./main-routing.module";
import {GameComponent} from "./game/game.component";
import {BillingComponent} from "./billing/billing.component";
import {ClipboardModule} from "ngx-clipboard";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {ImageCropperModule} from "ng2-img-cropper";
import {NgxCropperService} from "../shared/services/cropper.service";
import {GamesComponent} from "./games/games.component";


// *******************************************************************************
//

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        SidenavModule,
        SharedModule,
        NgxDatatableModule,
        MainRoutingModule,
        ClipboardModule,
        ConfirmationPopoverModule,
        ImageCropperModule
    ],
    declarations: [
        LayoutWithoutSidenavComponent,

        LayoutNavbarComponent,
        LayoutFooterComponent,

        AccountSettingsComponent,
        MainPageComponent,
        ReportsComponent,
        GameComponent,
        BillingComponent,
        GamesComponent
    ],
    providers: [
        MainService,
        NgxCropperService
    ]
})
export class MainModule {
}
