import {
    RouteReuseStrategy,
    ActivatedRouteSnapshot,
    DetachedRouteHandle,
} from '@angular/router';

export class RouteReuseService implements RouteReuseStrategy {
    private handlers: { [key: string]: DetachedRouteHandle } = {};
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (!route.routeConfig || route.routeConfig.loadChildren) {
            return false;
        }
        let shouldReuse = false;
        if (route.routeConfig.data) {
            route.routeConfig.data['reuse']
                ? (shouldReuse = true)
                : (shouldReuse = false);
        }
        return shouldReuse;
    }
    store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
        if (handler) {
            this.handlers[this.getUrl(route)] = handler;
        }
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!this.handlers[this.getUrl(route)];
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig || route.routeConfig.loadChildren) {
            return null as any;
        }
        return this.handlers[this.getUrl(route)];
    }
    shouldReuseRoute(
        future: ActivatedRouteSnapshot,
        current: ActivatedRouteSnapshot
    ): boolean {
        return future.routeConfig === current.routeConfig;
    }
    getUrl(route: ActivatedRouteSnapshot): string | any {
        if (route.routeConfig) {
            const url = route.routeConfig.path;
            return url;
        } else {
            return '';
        }
    }
}
