import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UserInfoModel} from "./shared/models/userInfo.model";

@Injectable()
export class AppService {
    constructor(private titleService: Title) {
    }

    public randomNum(start: number, end: number): number {
        return Math.floor(Math.random() * end) + start;
    }

    get showAlerts() {
        return true;
    }

    get userInfo() {
        let user: UserInfoModel = new UserInfoModel();
        user.uid = window.localStorage.getItem('uid');
        user.name = window.localStorage.getItem('name');
        user.userName = window.localStorage.getItem('userName');
        user.email = window.localStorage.getItem('email');
        user.token = window.localStorage.getItem('token');
        user.ip = window.localStorage.getItem('ip');
        user.avatar = window.localStorage.getItem('avatar');
        return user;
    }

    // Set page title
    set pageTitle(value: string) {
        this.titleService.setTitle(`${value} - Birofit`);
    }

    // Check for RTL layout
    get isRTL() {
        return document.documentElement.getAttribute('dir') === 'rtl' ||
            document.body.getAttribute('dir') === 'rtl';
    }

    get apiUrl() {
        return "https://api.birofit.com/";
    }

    // Check if IE10
    get isIE10() {
        return typeof document['documentMode'] === 'number' && document['documentMode'] === 10;
    }

    // Layout navbar color
    get layoutNavbarBg() {
        return 'navbar-theme';
    }

    // Layout sidenav color
    get layoutSidenavBg() {
        return 'sidenav-theme';
    }

    // Layout footer color
    get layoutFooterBg() {
        return 'footer-theme';
    }

    // Animate scrollTop
    scrollTop(to: number, duration: number, element = document.scrollingElement || document.documentElement) {
        if (element.scrollTop === to) {
            return;
        }
        const start = element.scrollTop;
        const change = to - start;
        const startDate = +new Date();

        // t = current time; b = start value; c = change in value; d = duration
        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) {
                return c / 2 * t * t + b;
            }
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animateScroll = function () {
            const currentDate = +new Date();
            const currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10);
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            } else {
                element.scrollTop = to;
            }
        };

        animateScroll();
    }
}
