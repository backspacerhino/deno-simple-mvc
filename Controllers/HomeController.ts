const first = globalThis.use("first")

export class HomeController {
    index({ request, response }) {        
        return request.respond({ body: `Hello World from ${first}\n` });
    }

    test({ request, response }){
        return request.respond({ body: "Testing\n" });

    }
}

