import { observable } from "./core/streams.js"
import { compose, filter } from "./core/transducer.js"

export const method = httpVerb => filter(req => req.method === httpVerb.toUpperCase())
export const path = matcher => filter(
    req => typeof matcher === 'function'
        ? matcher(req.url)
        : matcher === req.url
)

export const ObserveServer = (server) => observable(async (observer) => {
    for await (const req of server) {
        observer.next(req)
    }
})

export const event = compose
