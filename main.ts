import { Ignitor } from "./Core/Ignitor.ts";

let ignitor = new Ignitor()
await ignitor.ignite()
ignitor.startHttpServer();

