import IBsLoadingOverlayOptions from 'angular-loading-overlay/source/IBsLoadingOverlayOptions';
import {BsLoadingOverlayService} from 'angular-loading-overlay/source/BsLoadingOverlayService';

export default class BsLoadingOverlayHttpInterceptorInterceptor implements ng.IHttpInterceptor {
    constructor(
        private config: IBsLoadingOverlayOptions,
        private bsLoadingOverlayService: BsLoadingOverlayService
    ) {}

    private requestsCount = 0;

    private onRequest() {
        if (this.requestsCount === 0) {
            this.bsLoadingOverlayService.start(this.config);
        }

        this.requestsCount ++;
    }

    private onResponse() {
        this.requestsCount = Math.max(0, this.requestsCount - 1);

        if (this.requestsCount === 0) {
            this.bsLoadingOverlayService.stop(this.config);
        }
    }

    request = (config: ng.IRequestConfig) => {
        this.onRequest();
        return config;
    };

    requestError = (rejection) => {
        this.onResponse();
        return rejection;
    };

    response = (response: ng.IHttpPromiseCallbackArg<any>) => {
        this.onResponse();
        return response;
    };

    responseError = (rejection) => {
        this.onResponse();
        return rejection;
    };
}
