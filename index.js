const epxress = require("express")
const postsRouter = require("./posts/posts-router")

const server = epxress()
const port = 2415


server.use(epxress.json())
server.use("/", postsRouter)

server.listen(port, () => {
    console.log(`Server running at http://locallhost:${port}`)
})