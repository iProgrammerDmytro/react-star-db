// compose(
//   withSwapiService(mapMethodsToProps),
//   withData,
//   withChildFunction(renderModelAndName)
// )(ItemList)

// compose(a, b, c)(value)(value)
// a(b(c(value)))

const compose = (...funcs) => (comp) => {
  return funcs.reduceRight((prevResult, f) => f(prevResult), comp)
}

const arr = ["a", "b", "c"]
const res = arr.reduceRight((prevResult, value) => {
  return prevResult + value
})
console.log(res)
