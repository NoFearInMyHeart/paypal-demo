const Koa = require("koa");
const cors = require("@koa/cors");
const {routes} = require("./routes");


const app = new Koa();

app.use(cors(
    {
        origin: "http://localhost:5173"
    }
));

app.use(routes);

app.on("error", (error) => {
    console.error("Internal Error", error);
})

app.listen(3000);

console.log("服务器已打开，监听 3000 端口");
