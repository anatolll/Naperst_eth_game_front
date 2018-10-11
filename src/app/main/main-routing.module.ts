import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LayoutWithoutSidenavComponent} from "./layout-without-sidenav/layout-without-sidenav.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ReportsComponent} from "./reports/reports.component";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";
import {AuthGuard} from "../shared/services/auth.guard";
import {GameComponent} from "./game/game.component";
import {BillingComponent} from "./billing/billing.component";
import {GamesComponent} from "./games/games.component";

const routes: Routes = [
    {path: '', component: LayoutWithoutSidenavComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
        {path: '', component: MainPageComponent},
        {path: 'reports', component: ReportsComponent},
        {path: 'account-settings', component: AccountSettingsComponent},
        {path: 'game/:uid', component: GameComponent},
        {path: 'billing', component: BillingComponent},
        {path: 'billing/:tab', component: BillingComponent},
        {path: 'games', component: GamesComponent}
    ]}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainRoutingModule {

}