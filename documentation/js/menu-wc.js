'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">poms documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' : 'data-target="#xs-components-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' :
                                            'id="xs-components-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BasicLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BasicLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateNewOrderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateNewOrderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EinstellungenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EinstellungenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorPopUpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorPopUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FAQComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FAQComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FAQPopUpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FAQPopUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HarzinfobearbeitenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HarzinfobearbeitenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HarzloeschenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HarzloeschenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KategorieinfobearbeitenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KategorieinfobearbeitenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KategorieloeschenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KategorieloeschenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KundeloeschenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KundeloeschenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KundeninfobearbeitenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KundeninfobearbeitenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LogoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NeueKategorieComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NeueKategorieComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NeuerKundeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NeuerKundeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NeuesHarzComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NeuesHarzComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderFilterPopupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderFilterPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopUpDruckenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PopUpDruckenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopUpFAQComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PopUpFAQComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopUpNeuerDruckerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PopUpNeuerDruckerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopUpVanikComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PopUpVanikComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PostprintGroupActionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PostprintGroupActionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrintedordersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrintedordersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrinterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrinterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatusComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StatusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UrlTextPopUpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UrlTextPopUpComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' : 'data-target="#xs-directives-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' :
                                        'id="xs-directives-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' }>
                                        <li class="link">
                                            <a href="directives/FilterButtonActivatedDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterButtonActivatedDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SidebarDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' : 'data-target="#xs-injectables-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' :
                                        'id="xs-injectables-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' }>
                                        <li class="link">
                                            <a href="injectables/BackendService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BackendService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoginService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LoginService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' : 'data-target="#xs-pipes-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' :
                                            'id="xs-pipes-links-module-AppModule-f2e111abe570a8553f4ba531845eeb03"' }>
                                            <li class="link">
                                                <a href="pipes/EstimatedTimePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EstimatedTimePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/OrderIdLeadingZerosPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderIdLeadingZerosPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PrinterStatusPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrinterStatusPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SafePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SafePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/UploadService.html" data-type="entity-link">UploadService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/TestbackendService.html" data-type="entity-link">TestbackendService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/BenutzerService.html" data-type="entity-link">BenutzerService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IAlterCategory.html" data-type="entity-link">IAlterCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAlterResin.html" data-type="entity-link">IAlterResin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICategory.html" data-type="entity-link">ICategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICategoryDelete.html" data-type="entity-link">ICategoryDelete</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICategoryName.html" data-type="entity-link">ICategoryName</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateNewOrder.html" data-type="entity-link">ICreateNewOrder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICustomer.html" data-type="entity-link">ICustomer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICustomerDelete.html" data-type="entity-link">ICustomerDelete</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICustomerName.html" data-type="entity-link">ICustomerName</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDrucken.html" data-type="entity-link">IDrucken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFAQPage.html" data-type="entity-link">IFAQPage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFAQPageAlter.html" data-type="entity-link">IFAQPageAlter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFAQPageCreate.html" data-type="entity-link">IFAQPageCreate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFilterOrders.html" data-type="entity-link">IFilterOrders</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGroupedOrders.html" data-type="entity-link">IGroupedOrders</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrder.html" data-type="entity-link">IOrder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrderCreateNew.html" data-type="entity-link">IOrderCreateNew</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrderStatus.html" data-type="entity-link">IOrderStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPrinterData.html" data-type="entity-link">IPrinterData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPrinterDataPolling.html" data-type="entity-link">IPrinterDataPolling</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPrinterNew.html" data-type="entity-link">IPrinterNew</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResinDelete.html" data-type="entity-link">IResinDelete</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResinName.html" data-type="entity-link">IResinName</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResinType.html" data-type="entity-link">IResinType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISettingsPage.html" data-type="entity-link">ISettingsPage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISettingsPageSubtopic.html" data-type="entity-link">ISettingsPageSubtopic</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISettingsPagetopic.html" data-type="entity-link">ISettingsPagetopic</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});