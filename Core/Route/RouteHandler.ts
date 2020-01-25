export class RouteHandler {

    private _url: string;
    private _handler: string;
    constructor(url: string, handler: string) {
        this._url = url;
        this._handler = handler;
    }

    get url(): string {
        return this._url;
    }

    get handler(): string {
        return this._handler;
    }
}