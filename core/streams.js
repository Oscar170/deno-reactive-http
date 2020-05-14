import { compose } from "./transducer.js";

export const observable = (subscribe, transducer = next => value => next(value)) => ({
    next: value => transducer(value),
    pipe: (...transducers) => observable(subscribe, compose(transducer, ...transducers)),
    subscribe: listener => subscribe(observable(subscribe, transducer(listener))),
});

export const combine = (...fns) => next => value => next(fns.map(fn => fn(x => x)(value)))
