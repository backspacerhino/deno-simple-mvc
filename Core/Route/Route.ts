import { RouteHandler } from "./RouteHandler.ts";

export class Route {

    static _instance: Route = null;
    private _routeHandlers: Array<RouteHandler> = [];
    private _preloaded: Object;
    constructor() {
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new Route();
        }
        return this._instance;
    }

    setPreloaded(preloaded) {
        this._preloaded = preloaded;
    }

    handleRoute(url: string, request, response) {
        let found = false;
        if (url[0] == "/") {
            url = url.substr(1)
        }
        
        // TODO: REGEXP 
        if(url.includes(".")){
            found = true;
        }
    
        this._routeHandlers.forEach(async handler => {

            if (handler.url == url) {
                found = true;
                const explodedHandler = handler.handler.split(".");
                const className = explodedHandler[0];
                const methodName = explodedHandler[1];
                try {
                    return await this._preloaded[className][methodName]({ request, response })
                } catch (error) {
                    throw Error(`Could not find method ${methodName}`);
                }
            }
        });
        
        if (!found) {
            throw Error(`Could not find route ${url}`)
        }
    }

    add(url, handler) {
        if (url[0] == "/") {
            url = url.substr(1)
        }
        let routeHandler = new RouteHandler(url, handler)
        this._routeHandlers.push(routeHandler)
    }

    get(url: string, handler: string) {
        this.add(url, handler);
    }
}