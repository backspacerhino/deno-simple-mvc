import { Route } from "./Route/Route.ts";
import { Container } from "./Container.ts";
// import * as routes from "../start/routes.ts";
import { serve } from "https://deno.land/std@v0.30.0/http/server.ts";


export class Ignitor {
    private _route: Route;
    private _dirsToPreload: Array<string> = [
        "./start",
        "./Controllers"
    ];
    private _preloaded: Object = {};
    private static _instance: Ignitor = null;
    private _container: Container = null;
    constructor() {
        this._route = Route.getInstance();
        this.container();
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new Ignitor();
        }
        return this._instance;
    }

    container() {
        this._container = Container.getInstance();
        globalThis.use = this._container.get.bind(this._container)
    }

    async preloadFiles() {
        const promises = this._dirsToPreload.map(async dir => {

            const files = await Deno.readDir(dir);

            const promises = files.map(async file => {
                // Deno.readDir reads from the root but when we are importing it's from current folder
                let runtimeDir = "." + dir

                const className = file.name.split(".")[0]
                const module = await import(`${runtimeDir}/${file.name}`)
                // File maybe isn't a class so we'll just return module
                this._preloaded[className] = (module[className]) ? new module[className] : module
                return true
            })          

            await Promise.all(promises);
            return true;

        });
        await Promise.all(promises);                        
    }

    async ignite(){
        await this.preloadFiles();
        this._route.setPreloaded(this._preloaded);
        return this
    }

    async startHttpServer() {
        const server = serve({ port: 8000 });
        console.log("http://localhost:8000/");
        for await (const request of server) {
            this._route.handleRoute(request.url, request, {});
        }
    }
}

