//Каркас API блога

const {express, Router} = require("express");

const app = express();

//Функция-заглушка
function dummy(req, res){}
function auth_middleware_dummy(req, res, next){}

//Маршрут до начальной страницы
app.get('/', dummy)


const postRouter = Router();
postRouter.post('/new', auth_middleware_dummy, dummy)
postRouter.get('/list/:author_id', dummy);
postRouter.get('/show/:post_id', dummy);
postRouter.post('/edit/:post_id', auth_middleware_dummy, dummy);
postRouter.post('/delete/:post_id', auth_middleware_dummy, dummy);

app.use('/post', postRouter);

app.listen(8080);

