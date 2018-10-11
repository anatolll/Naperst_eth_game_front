import {Component, AfterViewInit, OnDestroy} from '@angular/core';
import {MainService} from "../../main.service";

@Component({
    selector: 'app-layout-without-sidenav',
    templateUrl: './layout-without-sidenav.component.html',
    styles: [':host { display: block; }']
})
export class LayoutWithoutSidenavComponent implements AfterViewInit, OnDestroy {
    // Prevent "blink" effect
    public initialized = false;

    constructor(private mainService: MainService) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.initialized = true;

            // Enshure that we have not '.layout-expanded' class on the html element
            this.mainService._removeClass('layout-expanded');

            this.mainService.init();
            this.mainService.update();
            this.mainService.setAutoUpdate(true);
        });
    }

    ngOnDestroy() {
        setTimeout(() => {
            this.mainService.destroy();
        });
    }
}
