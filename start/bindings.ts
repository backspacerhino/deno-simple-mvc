
const Container = globalThis.use("Container")

Container.bind("first", (ioc) => {
    return "TEST1"
})
Container.bind("second", (ioc) => {
    return "TEST2"
})
Container.bind("third", (ioc) => {
    return "TEST3"
})