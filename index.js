import { serve } from "https://deno.land/std@0.50.0/http/server.ts";

const compose = (...fns) => val => fns.reduceRight((a, b) => b(a), val)

const observable = (subscribe, transducer = next => value => next(value)) => ({
    next: value => transducer(value),
    pipe: (...transducers) => observable(subscribe, compose(transducer, ...transducers)),
    subscribe: listener => subscribe(observable(subscribe, transducer(listener))),
});

const map = f => next => value => next(f(value))
const filter = predicate => next => value => predicate(value) && next(value)
const tap = f => next => value => {
    f(value);
    next(value)
}

const method = httpVerb => filter(req => req.method === httpVerb.toUpperCase())

const ObserveServer = (server) => observable(async (observer) => {
    for await (const req of server) {
        observer.next(req)
    }
})

ObserveServer(serve({ port: 3000 }))
    .pipe(

        method('GET'),
        map(req => req.respond({ body: 'Hellow World!' })),
    ).subscribe(console.log)

