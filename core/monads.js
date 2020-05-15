const Right = (value) => ({
    map: morphism => Right(morphism(value)),
    leftMap: () => Right(value),
    flatMap: morphism => morphism(value),
    catchMap: () => Right(value),
    cata: (leftFn, rightFn) => rightFn(value)
})

const Left = (value) => ({
    map: () => Left(value),
    leftMap: morphism => Left(morphism(value)),
    flatMap: () => Left(value),
    catchMap: morphism => morphism(value),
    cata: (leftFn, rightFn) => leftFn(value)
})

export const Either = Object.freeze({ Left, Right })
