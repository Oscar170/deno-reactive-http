export const compose = (...fns) => val => fns.reduceRight((a, b) => b(a), val)

export const map = f => next => value => next(f(value))
export const filter = predicate => next => value => predicate(value) && next(value)
export const tap = f => next => value => {
    f(value)
    next(value)
}
