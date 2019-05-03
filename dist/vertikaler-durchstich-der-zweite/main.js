(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _basic_page_basic_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basic-page/basic-page.component */ "./src/app/basic-page/basic-page.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _timeline_timeline_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timeline/timeline.component */ "./src/app/timeline/timeline.component.ts");
/* harmony import */ var _test_component_test_component_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./test-component/test-component.component */ "./src/app/test-component/test-component.component.ts");






var routes = [
    { path: '', redirectTo: '/test', pathMatch: 'full' },
    { path: 'test', component: _test_component_test_component_component__WEBPACK_IMPORTED_MODULE_5__["TestComponentComponent"] },
    { path: 'timeline', component: _timeline_timeline_component__WEBPACK_IMPORTED_MODULE_4__["TimelineComponent"] },
    { path: 'basicpage', component: _basic_page_basic_page_component__WEBPACK_IMPORTED_MODULE_1__["BasicPageComponent"] },
    { path: '**', redirectTo: '/test', pathMatch: 'full' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-side-menu>\n  <router-outlet></router-outlet>\n</app-side-menu>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'vertikaler-durchstich-der-zweite';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _test_component_test_component_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./test-component/test-component.component */ "./src/app/test-component/test-component.component.ts");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm5/ng-zorro-antd.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_locales_de__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/locales/de */ "./node_modules/@angular/common/locales/de.js");
/* harmony import */ var _angular_common_locales_de__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_de__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _side_menu_side_menu_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./side-menu/side-menu.component */ "./src/app/side-menu/side-menu.component.ts");
/* harmony import */ var _timeline_timeline_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./timeline/timeline.component */ "./src/app/timeline/timeline.component.ts");
/* harmony import */ var _shared_basic_layout_basic_layout_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared/basic-layout/basic-layout.component */ "./src/app/shared/basic-layout/basic-layout.component.ts");
/* harmony import */ var _basic_page_basic_page_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./basic-page/basic-page.component */ "./src/app/basic-page/basic-page.component.ts");
















Object(_angular_common__WEBPACK_IMPORTED_MODULE_10__["registerLocaleData"])(_angular_common_locales_de__WEBPACK_IMPORTED_MODULE_11___default.a);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _test_component_test_component_component__WEBPACK_IMPORTED_MODULE_5__["TestComponentComponent"],
                _side_menu_side_menu_component__WEBPACK_IMPORTED_MODULE_12__["SideMenuComponent"],
                _timeline_timeline_component__WEBPACK_IMPORTED_MODULE_13__["TimelineComponent"],
                _shared_basic_layout_basic_layout_component__WEBPACK_IMPORTED_MODULE_14__["BasicLayoutComponent"],
                _basic_page_basic_page_component__WEBPACK_IMPORTED_MODULE_15__["BasicPageComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                ng_zorro_antd__WEBPACK_IMPORTED_MODULE_6__["NgZorroAntdModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__["BrowserAnimationsModule"]
            ],
            providers: [{ provide: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_6__["NZ_I18N"], useValue: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_6__["de_DE"] }],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/basic-page/basic-page.component.css":
/*!*****************************************************!*\
  !*** ./src/app/basic-page/basic-page.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Jhc2ljLXBhZ2UvYmFzaWMtcGFnZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/basic-page/basic-page.component.html":
/*!******************************************************!*\
  !*** ./src/app/basic-page/basic-page.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-basic-layout>\n    <nz-breadcrumb style=\"margin:16px 0;\" class=\"breadcrums\">\n        <nz-breadcrumb-item>User</nz-breadcrumb-item>\n        <nz-breadcrumb-item>BasicPage</nz-breadcrumb-item>\n      </nz-breadcrumb>\n\n  <div class=\"basic-content\">\n    Basic contenttttt\n  </div>\n</app-basic-layout>\n\n"

/***/ }),

/***/ "./src/app/basic-page/basic-page.component.ts":
/*!****************************************************!*\
  !*** ./src/app/basic-page/basic-page.component.ts ***!
  \****************************************************/
/*! exports provided: BasicPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicPageComponent", function() { return BasicPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var BasicPageComponent = /** @class */ (function () {
    function BasicPageComponent() {
    }
    BasicPageComponent.prototype.ngOnInit = function () {
    };
    BasicPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-basic-page',
            template: __webpack_require__(/*! ./basic-page.component.html */ "./src/app/basic-page/basic-page.component.html"),
            styles: [__webpack_require__(/*! ./basic-page.component.css */ "./src/app/basic-page/basic-page.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], BasicPageComponent);
    return BasicPageComponent;
}());



/***/ }),

/***/ "./src/app/services/backend.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/backend.service.ts ***!
  \*********************************************/
/*! exports provided: BackendService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackendService", function() { return BackendService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var BackendService = /** @class */ (function () {
    function BackendService(http) {
        this.http = http;
        this.url = 'https://jsonplaceholder.typicode.com/users/';
    }
    BackendService.prototype.getUserData = function (id) {
        return this.http.get(this.url + String(id + 1));
    };
    BackendService.prototype.testLog = function () {
        console.log("Void");
    };
    BackendService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], BackendService);
    return BackendService;
}());



/***/ }),

/***/ "./src/app/shared/basic-layout/basic-layout.component.css":
/*!****************************************************************!*\
  !*** ./src/app/shared/basic-layout/basic-layout.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9iYXNpYy1sYXlvdXQvYmFzaWMtbGF5b3V0LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/shared/basic-layout/basic-layout.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/shared/basic-layout/basic-layout.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-content select=\"nz-breadcrumb\"></ng-content>\n\n<div style=\"padding:24px; background: #fff; min-height: 360px;\">\n  <ng-content select=\".basic-content\"></ng-content>\n</div>\n\n\n<!-- <app-basic-layout>\n    <nz-breadcrumb style=\"margin:16px 0;\" class=\"breadcrums\">\n        <nz-breadcrumb-item>User</nz-breadcrumb-item>\n        <nz-breadcrumb-item>BasicPage</nz-breadcrumb-item>\n      </nz-breadcrumb>\n  <div class=\"basic-breadcrumbs\">\n      test\n  </div>\n  <div class=\"basic-content\">\n    Basic contenttttt\n  </div>\n</app-basic-layout> -->"

/***/ }),

/***/ "./src/app/shared/basic-layout/basic-layout.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/shared/basic-layout/basic-layout.component.ts ***!
  \***************************************************************/
/*! exports provided: BasicLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicLayoutComponent", function() { return BasicLayoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var BasicLayoutComponent = /** @class */ (function () {
    function BasicLayoutComponent() {
    }
    BasicLayoutComponent.prototype.ngOnInit = function () {
    };
    BasicLayoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-basic-layout',
            template: __webpack_require__(/*! ./basic-layout.component.html */ "./src/app/shared/basic-layout/basic-layout.component.html"),
            styles: [__webpack_require__(/*! ./basic-layout.component.css */ "./src/app/shared/basic-layout/basic-layout.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], BasicLayoutComponent);
    return BasicLayoutComponent;
}());



/***/ }),

/***/ "./src/app/side-menu/side-menu.component.css":
/*!***************************************************!*\
  !*** ./src/app/side-menu/side-menu.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".logo {\n  /* height: 32px;\n  background: rgba(255, 255, 255, 0.2);\n  margin: 16px; */\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2lkZS1tZW51L3NpZGUtbWVudS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0U7O2lCQUVlO0FBQ2pCIiwiZmlsZSI6InNyYy9hcHAvc2lkZS1tZW51L3NpZGUtbWVudS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxvZ28ge1xuICAvKiBoZWlnaHQ6IDMycHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgbWFyZ2luOiAxNnB4OyAqL1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/side-menu/side-menu.component.html":
/*!****************************************************!*\
  !*** ./src/app/side-menu/side-menu.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Refrence: https://ng.ant.design/components/layout/en#components-layout-demo-top -->\n<nz-layout>\n  <!-- Left Side Menu -->\n  <nz-sider\n    nzCollapsible\n    [(nzCollapsed)]=\"isCollapsed\"\n    [nzWidth]=\"width\"\n    [nzReverseArrow]=\"isReverseArrow\"\n  >\n    <div class=\"logo\">\n      <img src=\"../../assets/bitExpert_logo.svg\" alt=\"bitExpert\" />\n    </div>\n    <ul\n      nz-menu\n      [nzTheme]=\"'dark'\"\n      [nzMode]=\"'inline'\"\n      [nzInlineCollapsed]=\"isCollapsed\"\n    >\n      <li nz-submenu>\n        <span title\n          ><i nz-icon type=\"user\"></i><span class=\"nav-text\">User</span></span\n        >\n        <ul>\n          <li nz-menu-item>Tom</li>\n          <li nz-menu-item>Bill</li>\n          <li nz-menu-item>Alex</li>\n        </ul>\n      </li>\n      <li nz-submenu>\n        <span title\n          ><i nz-icon type=\"team\"></i><span class=\"nav-text\">Team</span></span\n        >\n        <ul>\n          <li nz-menu-item>Team 1</li>\n          <li nz-menu-item>Team 2</li>\n        </ul>\n      </li>\n      <li nz-menu-item [routerLink]=\"['timeline']\">\n        <span>\n          <i nz-icon type=\"file\"></i>\n          <span class=\"nav-text\">File</span>\n        </span>\n      </li>\n      <li nz-menu-item [routerLink]=\"['test']\">\n        <span>\n          <i nz-icon type=\"printer\"></i>\n          <span class=\"nav-text\">Printer</span>\n        </span>\n      </li>\n      <li nz-menu-item [routerLink]=\"['basicpage']\">\n        <span>\n          <i nz-icon type=\"user\"></i>\n          <span class=\"nav-text\">BasicLayout</span>\n        </span>\n      </li>\n    </ul>\n  </nz-sider>\n  <!-- Main Layout - includes right Sider -->\n  <nz-layout>\n    <!-- Header -->\n    <nz-header style=\"background-color: rgb(33, 216, 33)\">\n      <div nz-row nzType=\"flex\" nzJustify=\"space-between\" nzAlign=\"middle\">\n        <div nz-col nzSpan=\"4\"><p>Page Title</p></div>\n        <!-- <div nz-col nzSpan=\"4\"><p class=\"height-120\">col-4</p></div> -->\n        <div nz-col nzSpan=\"4\">\n          <nz-input-group nzSearch [nzAddOnAfter]=\"suffixIconButton\">\n            <input type=\"text\" nz-input placeholder=\"input search text\" />\n          </nz-input-group>\n          <ng-template #suffixIconButton>\n            <button nz-button nzType=\"primary\" nzSearch>\n              <i nz-icon type=\"search\"></i>\n            </button>\n          </ng-template>\n        </div>\n      </div>\n    </nz-header>\n    <!-- Page layout -includes right sider -->\n    <nz-layout>\n      <!-- Displayed content - slot projection -->\n      <nz-content style=\"margin:0 16px;\">\n        <ng-content></ng-content>\n      </nz-content>\n      <!-- Right sider  -->\n      <nz-sider\n        style=\"background-color: rgb(206, 216, 206); flex: 1; max-width: 300px; min-width: 300px; width: 300px;\"\n      >\n        <div>\n          <nz-divider nzText=\"Druckaufträge\" nzOrientation=\"left\"></nz-divider>\n          <ul>\n            <li>\n              #1234<nz-progress [nzPercent]=\"30\" nzSize=\"small\"></nz-progress>\n            </li>\n            <li>\n              <nz-progress\n                [nzPercent]=\"50\"\n                nzSize=\"small\"\n                nzStatus=\"active\"\n              ></nz-progress>\n            </li>\n          </ul>\n          <div>\n            <nz-divider nzText=\"#12345\" nzOrientation=\"left\"></nz-divider>\n            <nz-progress\n              [nzPercent]=\"70\"\n              nzSize=\"small\"\n              nzStatus=\"exception\"\n            ></nz-progress>\n          </div>\n          <nz-progress [nzPercent]=\"100\" nzSize=\"small\"></nz-progress>\n          <nz-progress\n            [nzPercent]=\"50\"\n            nzSize=\"small\"\n            [nzShowInfo]=\"false\"\n          ></nz-progress>\n        </div>\n      </nz-sider>\n    </nz-layout>\n    <!-- Footer -->\n    <nz-footer style=\"text-align: center;\">\n      Ant Design ©2019 Implement By Angular\n    </nz-footer>\n  </nz-layout>\n</nz-layout>\n"

/***/ }),

/***/ "./src/app/side-menu/side-menu.component.ts":
/*!**************************************************!*\
  !*** ./src/app/side-menu/side-menu.component.ts ***!
  \**************************************************/
/*! exports provided: SideMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideMenuComponent", function() { return SideMenuComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SideMenuComponent = /** @class */ (function () {
    function SideMenuComponent() {
        this.isCollapsed = false;
        this.isReverseArrow = false;
        this.width = 200;
    }
    SideMenuComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-side-menu',
            template: __webpack_require__(/*! ./side-menu.component.html */ "./src/app/side-menu/side-menu.component.html"),
            styles: [__webpack_require__(/*! ./side-menu.component.css */ "./src/app/side-menu/side-menu.component.css")]
        })
    ], SideMenuComponent);
    return SideMenuComponent;
}());



/***/ }),

/***/ "./src/app/test-component/test-component.component.css":
/*!*************************************************************!*\
  !*** ./src/app/test-component/test-component.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "[nz-radio] {\n    display: block;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVzdC1jb21wb25lbnQvdGVzdC1jb21wb25lbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGNBQWM7RUFDaEIiLCJmaWxlIjoic3JjL2FwcC90ZXN0LWNvbXBvbmVudC90ZXN0LWNvbXBvbmVudC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiW256LXJhZGlvXSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/test-component/test-component.component.html":
/*!**************************************************************!*\
  !*** ./src/app/test-component/test-component.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-basic-layout>\n  <nz-breadcrumb style=\"margin:16px 0;\" class=\"breadcrums\">\n    <nz-breadcrumb-item>User</nz-breadcrumb-item>\n    <nz-breadcrumb-item>Test-Compo</nz-breadcrumb-item>\n  </nz-breadcrumb>\n\n  <div class=\"basic-content\">\n    <div nz-row>\n      <div nz-col nzSpan=\"12\">\n        <div *ngIf=\"!typiCodeUserData\">\n          <nz-card style=\"width: 300px;margin-top: 16px\" [nzLoading]=\"true\">\n            <nz-card-meta\n              nzTitle=\"Card title\"\n              nzDescription=\"This is the description\"\n            ></nz-card-meta>\n          </nz-card>\n        </div>\n        <div *ngIf=\"typiCodeUserData\">\n          <nz-card\n            style=\"width:300px;\"\n            nzTitle=\"{{ typiCodeUserData.name }}\"\n            [nzExtra]=\"extraTemplate\"\n          >\n            <p>{{ typiCodeUserData.username }}</p>\n            <p>{{ typiCodeUserData.email }}</p>\n            <p>{{ typiCodeUserData.phone }}</p>\n            <p>{{ typiCodeUserData.address.street }}</p>\n          </nz-card>\n          <ng-template #extraTemplate>\n            <a>More</a>\n          </ng-template>\n        </div>\n      </div>\n      <div nz-col nzSpan=\"12\">\n        <nz-row [nzGutter]=\"16\">\n          <nz-col [nzSpan]=\"12\">\n            <nz-statistic\n              *ngIf=\"typiCodeUserData\"\n              [nzValue]=\"typiCodeUserData.address.geo.lng | number\"\n              [nzTitle]=\"'Feedback'\"\n              [nzPrefix]=\"prefixTpl\"\n            ></nz-statistic>\n            <ng-template #prefixTpl><i nz-icon type=\"like\"></i></ng-template>\n          </nz-col>\n          <nz-col [nzSpan]=\"12\">\n            <nz-statistic\n              [nzValue]=\"93\"\n              [nzTitle]=\"'Unmerged'\"\n              [nzSuffix]=\"'/ 100'\"\n            ></nz-statistic>\n          </nz-col>\n        </nz-row>\n      </div>\n    </div>\n\n    <h3 [ngStyle]=\"{ 'margin-bottom.px': 16 }\">Default Size</h3>\n    <nz-list\n      [nzDataSource]=\"data\"\n      nzBordered\n      [nzHeader]=\"'Header'\"\n      [nzFooter]=\"'Footer'\"\n      [nzRenderItem]=\"item\"\n    >\n      <ng-template #item let-item\n        ><nz-list-item [nzContent]=\"item\"></nz-list-item\n      ></ng-template>\n    </nz-list>\n    <p>\n      test-component works!\n    </p>\n    <nz-radio-group [(ngModel)]=\"radioValue\">\n      <label nz-radio [ngStyle]=\"style\" nzValue=\"A\">Option A</label>\n      <label nz-radio [ngStyle]=\"style\" nzValue=\"B\">Option B</label>\n      <label nz-radio [ngStyle]=\"style\" nzValue=\"C\">Option C</label>\n      <label nz-radio [ngStyle]=\"style\" nzValue=\"M\">\n        More...\n        <input\n          type=\"text\"\n          nz-input\n          *ngIf=\"radioValue == 'M'\"\n          style=\"width: 100px; margin-left: 10px;\"\n        />\n      </label>\n    </nz-radio-group>\n\n    <nz-card\n      style=\"width:300px;\"\n      nzTitle=\"Card title\"\n      [nzExtra]=\"extraTemplate\"\n    >\n      <p>Card content</p>\n      <p>Card content</p>\n      <p>Card content</p>\n    </nz-card>\n    <ng-template #extraTemplate>\n      <a>More</a>\n    </ng-template>\n  </div>\n</app-basic-layout>\n"

/***/ }),

/***/ "./src/app/test-component/test-component.component.ts":
/*!************************************************************!*\
  !*** ./src/app/test-component/test-component.component.ts ***!
  \************************************************************/
/*! exports provided: TestComponentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestComponentComponent", function() { return TestComponentComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _services_backend_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../services/backend.service */ "./src/app/services/backend.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");





var TestComponentComponent = /** @class */ (function () {
    function TestComponentComponent(backendService) {
        this.backendService = backendService;
        this.radioValue = "A";
        this.style = {
            display: "block",
            height: "30px",
            lineHeight: "30px"
        };
        this.data = [
            "Racing car sprays burning fuel into crowd.",
            "Japanese princess to wed commoner.",
            "Australian walks 100km after outback crash.",
            "Man charged over missing wedding girl.",
            "Los Angeles battles huge wildfires."
        ];
    }
    TestComponentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userDataSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["timer"])(3000, 1500)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (id) { return _this.backendService.getUserData(id); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err, caught) { return caught; }))
            .subscribe(function (userData) {
            console.log("Interval", userData), (_this.typiCodeUserData = userData);
        });
    };
    TestComponentComponent.prototype.ngOnDestroy = function () {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.userDataSubscription.unsubscribe();
    };
    TestComponentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-test-component",
            template: __webpack_require__(/*! ./test-component.component.html */ "./src/app/test-component/test-component.component.html"),
            styles: [__webpack_require__(/*! ./test-component.component.css */ "./src/app/test-component/test-component.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"]])
    ], TestComponentComponent);
    return TestComponentComponent;
}());



/***/ }),

/***/ "./src/app/timeline/timeline.component.html":
/*!**************************************************!*\
  !*** ./src/app/timeline/timeline.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n<app-basic-layout>\n    <nz-breadcrumb style=\"margin:16px 0;\" class=\"breadcrums\">\n  <nz-breadcrumb-item>User</nz-breadcrumb-item>\n  <nz-breadcrumb-item>Timeline</nz-breadcrumb-item>\n</nz-breadcrumb>\n\n  <div class=\"basic-content\">\n        <nz-slider\n    [nzMarks]=\"marksGutter\"\n    [nzStep]=\"null\"\n    [nzDefaultValue]=\"16\"\n    [nzMax]=\"48\"\n    [(ngModel)]=\"gutter\"\n  ></nz-slider>\n  \n  <nz-timeline nzMode=\"alternate\">\n    <nz-timeline-item>Create a services site 2015-09-01</nz-timeline-item>\n    <nz-timeline-item nzColor=\"green\"\n      >Solve initial network problems 2015-09-01</nz-timeline-item\n    >\n    <nz-timeline-item [nzDot]=\"dotTemplate\"\n      >Sed ut perspiciatis unde omnis iste natus error sit voluptatem\n      accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab\n      illo inventore veritatis et quasi architecto beatae vitae dicta sunt\n      explicabo.</nz-timeline-item\n    >\n    <nz-timeline-item nzColor=\"red\"\n      >Network problems being solved 2015-09-01</nz-timeline-item\n    >\n    <nz-timeline-item>Create a services site 2015-09-01</nz-timeline-item>\n    <nz-timeline-item [nzDot]=\"dotTemplate\"\n      >Technical testing 2015-09-01</nz-timeline-item\n    >\n  </nz-timeline>\n  <ng-template #dotTemplate>\n    <i nz-icon type=\"clock-circle-o\" style=\"font-size: 16px;\"></i>\n  </ng-template>\n  </div>\n</app-basic-layout>"

/***/ }),

/***/ "./src/app/timeline/timeline.component.ts":
/*!************************************************!*\
  !*** ./src/app/timeline/timeline.component.ts ***!
  \************************************************/
/*! exports provided: TimelineComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineComponent", function() { return TimelineComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TimelineComponent = /** @class */ (function () {
    function TimelineComponent() {
        this.gutter = 16;
        this.count = 4;
        this.marksGutter = {
            8: 8,
            16: 16,
            24: 24,
            32: 32,
            40: 40,
            48: 48
        };
        this.marksCount = {
            2: 2,
            3: 3,
            4: 4,
            6: 6,
            8: 8,
            12: 12
        };
    }
    TimelineComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-timeline',
            template: __webpack_require__(/*! ./timeline.component.html */ "./src/app/timeline/timeline.component.html")
        })
    ], TimelineComponent);
    return TimelineComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/benedict/Documents/Studium/SEP/bitExpert/bxp-frontend/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map