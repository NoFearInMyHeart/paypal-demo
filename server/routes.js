const Router = require("koa-router");
const router = new Router();

router.get("/", (ctx) => {
    ctx.body = "hello";
})

module.exports = {
    routes: router.routes()
}
