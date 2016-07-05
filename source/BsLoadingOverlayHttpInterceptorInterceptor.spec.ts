import BsLoadingOverlayHttpInterceptor from './BsLoadingOverlayHttpInterceptorInterceptor';
import {BsLoadingOverlayService} from 'angular-loading-overlay/source/BsLoadingOverlayService';
import IBsLoadingOverlayOptions from 'angular-loading-overlay/source/IBsLoadingOverlayOptions';

describe('Interceptor', () => {
    let interceptor: BsLoadingOverlayHttpInterceptor;
    let service: any;
    let options: IBsLoadingOverlayOptions;
    let requestConfig: ng.IRequestConfig;
    let responsePromise: ng.IHttpPromiseCallbackArg<any>;

    beforeEach(() => {
        service = {
            start: sinon.spy(),
            stop: sinon.spy()
        };

        requestConfig = {
            url: 'test',
            method: 'POST'
        };

        responsePromise = {
            data: 'test data'
        };

        interceptor = new BsLoadingOverlayHttpInterceptor(options, service);
    });

    it('should return provided options on request', () => {
        let returnedRequest = interceptor.request(requestConfig);
        expect(returnedRequest).toEqual(requestConfig);
    });

    it('should call service start with provided options on request', () => {
        interceptor.request(requestConfig);

        expect(service.start.calledWith(options)).toBeTruthy();
    });

    it('should call service start once on request', () => {
        interceptor.request(requestConfig);

        expect(service.start.calledOnce).toBeTruthy();
    });

    it('should call service start once on request called twice', () => {
        interceptor.request(requestConfig);
        interceptor.request(requestConfig);

        expect(service.start.calledOnce).toBeTruthy();
    });

    it('should call service start once on request called twice', () => {
        interceptor.request(requestConfig);
        interceptor.request(requestConfig);

        expect(service.start.calledOnce).toBeTruthy();
    });

    it('should return provided rejection on request error', () => {
        const rejection = {rejectionField: 123};
        let returnedRejection = interceptor.requestError(rejection);
        expect(returnedRejection).toEqual(rejection);
    });

    it('should call service stop once on request error after request', () => {
        interceptor.request(requestConfig);
        interceptor.requestError(requestConfig);

        expect(service.stop.calledOnce).toBeTruthy();
    });

    it('should call service stop with provided options on request error after request', () => {
        interceptor.request(requestConfig);
        interceptor.requestError(requestConfig);

        expect(service.stop.calledWith(options)).toBeTruthy();
    });

    it('should call service stop once on request error called twice after request called twice', () => {
        interceptor.request(requestConfig);
        interceptor.request(requestConfig);
        interceptor.requestError(requestConfig);
        interceptor.requestError(requestConfig);

        expect(service.stop.calledOnce).toBeTruthy();
    });

    describe('response', () => {
        it('should return provided promise', () => {
            const returnedPromise = interceptor.response(responsePromise);
            expect(returnedPromise).toBe(responsePromise);
        });

        it('should call service stop once on response called after request called', () => {
            interceptor.request(requestConfig);
            interceptor.response(responsePromise);

            expect(service.stop.calledOnce).toBeTruthy();
        });

        it('should call service stop with provided options on response called after request called', () => {
            interceptor.request(requestConfig);
            interceptor.response(responsePromise);

            expect(service.stop.calledWith(options)).toBeTruthy();
        });

        it('should call service stop once on response called twice after request called twice', () => {
            interceptor.request(requestConfig);
            interceptor.request(requestConfig);
            interceptor.response(responsePromise);
            interceptor.response(responsePromise);

            expect(service.stop.calledOnce).toBeTruthy();
        });
    });

    describe('responseError', () => {
        it('should return provided promise', () => {
            const returnedPromise = interceptor.responseError(responsePromise);
            expect(returnedPromise).toBe(responsePromise);
        });

        it('should call service stop once on responseError called after request called', () => {
            interceptor.request(requestConfig);
            interceptor.responseError(responsePromise);

            expect(service.stop.calledOnce).toBeTruthy();
        });

        it('should call service stop with provided options on responseError called after request called', () => {
            interceptor.request(requestConfig);
            interceptor.responseError(responsePromise);

            expect(service.stop.calledWith(options)).toBeTruthy();
        });

        it('should call service stop once on responseError called twice after request called twice', () => {
            interceptor.request(requestConfig);
            interceptor.request(requestConfig);
            interceptor.responseError(responsePromise);
            interceptor.responseError(responsePromise);

            expect(service.stop.calledOnce).toBeTruthy();
        });
    });
});
