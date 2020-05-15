import { serve } from "https://deno.land/std@0.50.0/http/server.ts";
import { map } from "./core/transducer.js";
import { combine } from "./core/streams.js";
import { ObserveServer, event, path } from "./lib.js";


ObserveServer(serve({ port: 3000 }))
    .pipe(
        combine(
            event(
                path('/hello'),
                map(req => req.respond({ body: 'Hellow World!' })),
            ),
            event(
                path('/some'),
                map(req => req.respond({ body: 'Some World!' })),
            )
        )
    ).subscribe(console.log)

