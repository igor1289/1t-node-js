const { Sequelize, Model, DataTypes} = require('sequelize');

//Подключение к БД
const sequelize = new Sequelize('postgres', 'postgres', '1', {
    host: 'localhost',
    dialect: 'postgres'
});

class User extends Model
{
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
sequelize)

class Post extends Model
{
}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    }
},
sequelize)

User.hasMany(Post)
Post.belongsTo(User)

sequelize.sync();

//Express
const {express, Router, json} = require("express");
const { title } = require('process');

const app = express();

app.use(json)

//Функция-заглушка
function dummy(req, res){}
function auth_middleware_dummy(req, res, next){}

//Маршрут до начальной страницы
app.get('/', dummy)

function currentUserId()
{
    return 1;
}

async function postNew(req, res)
{
    const post = await Post.create({
        UserId: currentUserId(),
        title: req.body.title,
        content: req.body.content,
    })

    res.status(200)
}

async function postList(req, res)
{
    const posts = await User.findAll({
        where: {
            id: req.params.author_id
        },
        include: Post
    });

    res.json(posts);
}

async function postShow(req, res)
{
    const post = await Post.findOne({
        where: {
            id: req.params.post_id
        },
        include: User
    });

    res.json(post);
}

async function postEdit(req, res)
{
    const post = await Post.findOne({
        where: {
            id: req.params.post_id
        }
    });

    if(!post)
    {
        res.status(400);
        res.end();
    }else{
        post.content = req.body.content;
        post.save();

        res.status(200);
    }
}

async function postDelete(req, res)
{
    const post = await Post.destroy({
        where: {
            id: req.params.post_id
        }
    })

    res.status(200);
}


const postRouter = Router();
postRouter.post('/new', auth_middleware_dummy, postNew)
postRouter.get('/list/:author_id', postList);
postRouter.get('/show/:post_id', postShow);
postRouter.patch('/edit/:post_id', auth_middleware_dummy, postEdit);
postRouter.delete('/delete/:post_id', auth_middleware_dummy, postDelete);

app.use('/post', postRouter);

app.listend(8080);