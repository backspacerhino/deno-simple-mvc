import { Route } from "./Route/Route.ts";

export class Container {
    private _bindings: Map<string, Function> = new Map();
    private _singletons: Map<string, Object> = new Map();
    private static _instance: Container = null;

    constructor() {}
    
    static getInstance() {
        if (!this._instance) {
            this._instance = new Container();
            this.initialBindings();
        }
        return this._instance;
    }


    static initialBindings(){
        this._instance.singleton('Route', (ioc) => {
            return Route.getInstance()
        })
        this._instance.singleton('Container', (ioc) => {
            return this.getInstance()
        })
    }

    bind(name: string, closure: Function) {
        this._bindings.set(name, closure)
    }

    singleton(name: string, closure: Function) {
        this._singletons.set(name, this.resolve(closure))
    }

    get(name: string) {      
        const binding = this._bindings.get(name);
        if (!binding) {
            const instance = this._singletons.get(name);
            if(!instance){
                throw new Error(`Can't find binding ${name}.`)
            }
            return instance;
        }
        return this.resolve(binding);
    }

    resolve(binding: Function) {
        return binding(this);
    }
}

