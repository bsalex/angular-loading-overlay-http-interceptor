import BsLoadingOverlayHttpInterceptorInterceptor from './BsLoadingOverlayHttpInterceptorInterceptor';
import IBsLoadingOverlayOptions from 'angular-loading-overlay/source/IBsLoadingOverlayOptions';
import {BsLoadingOverlayService} from 'angular-loading-overlay/source/BsLoadingOverlayService';

const bsLoadingOverlayHttpInterceptorFactoryFactory: ng.IHttpInterceptorFactory =
    (bsLoadingOverlayService: BsLoadingOverlayService) =>
        (config: IBsLoadingOverlayOptions) =>
            new BsLoadingOverlayHttpInterceptorInterceptor(config, bsLoadingOverlayService);

bsLoadingOverlayHttpInterceptorFactoryFactory.$inject = ['bsLoadingOverlayService'];

export default bsLoadingOverlayHttpInterceptorFactoryFactory;
