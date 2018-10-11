import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../../app.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CropperSettings, ImageCropperComponent} from "ng2-img-cropper";
import {UserInfoModel} from "../../shared/models/userInfo.model";

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit{

    @ViewChild('defaultModal') defaultModal: any;
    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    userInfo: UserInfoModel;
    private formGeneral: FormGroup;
    private formPassword: FormGroup;
    cropperSettings: CropperSettings;
    data: any;


    constructor(private appService: AppService, private modalService: NgbModal) {
        this.appService.pageTitle = 'Account settings';
        this.userInfo = this.appService.userInfo;
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth = 100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
        this.data = {};
    }

    ngOnInit(): void {
        this.formGeneral = new FormGroup({
            'name': new FormControl(this.userInfo.name, [
                Validators.required,
                Validators.minLength(3)
            ])
        });
        this.formPassword = new FormGroup({
            'currentpassword': new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(15),
                Validators.pattern("^(?=^.{6,15}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")
            ]),
            'newpassword': new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(15),
                Validators.pattern("^(?=^.{6,15}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")
            ]),
            'repassword': new FormControl(null)
        });
    }

    onChangePassword() {
        if (this.formPassword.get('newpassword').value != this.formPassword.get('repassword').value) {
            this.formPassword.get('repassword').setErrors({missmath: true});
        }
        if ((this.formPassword.get('newpassword').value != '' || this.formPassword.get('repassword').value != '') &&
            this.formPassword.get('currentpassword').value == '') {
            this.formPassword.get('currentpassword').setErrors({missmath: true});
        }
    }

    onSubmitGeneral() {
        alert('Settings save dummy');
    }

    onSubmitPassword() {
        alert('Change password dummy');
    }

    open(content, options = {}) {
        this.modalService.open(content, options).result.then((result) => {
            console.log(`Closed with: ${result}`);
        }, (reason) => {
            console.log(`Dismissed ${this.getDismissReason(reason)}`);
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    fileChangeListener($event, cropperComp: ImageCropperComponent) {
        var that = this;
        that.cropper = cropperComp;
        console.log(cropperComp);
        const image: any = new Image();
        const file: File = $event.target.files[0];
        const myReader: FileReader = new FileReader();

        myReader.onloadend = (loadEvent: any) => {
            image.src = loadEvent.target.result;
            console.log(that.cropper);
            that.cropper.setImage(image);
        };
        myReader.readAsDataURL(file);
    }

    openModal() {
        const modalRef = this.modalService.open(this.defaultModal);
    }

    saveAvatar() {
        console.log(this.cropper);
    }
}
