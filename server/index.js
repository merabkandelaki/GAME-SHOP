import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import db from './db.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const soltRounds = 10

const app = express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 5,
    }
}))

app.get("/", (req, res) => {
    res.json("hello this is the server")
})

app.get("/games", (req, res) => {
    const q = "SELECT * FROM games";
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/games", (req, res) => {
    const q = "INSERT INTO games (`title`, `desc`, `cover`, `genres`, `price`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.genres,
        req.body.price,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err)
        return res.json("Game has been created successfully")
    })
})

app.delete("/games/:id", (req, res) => {
    const gameId = req.params.id
    const q = "DELETE FROM games WHERE id = ?"

    db.query(q, [gameId], (err, data) => {
        if (err) return res.send(err)
        return res.json("Game has been deleted successfully")
    })
})

app.put("/games/:id", (req, res) => {
    const gameId = req.params.id
    const q = "UPDATE games SET `title` = ?, `desc` = ?, `cover` = ?, `genres` = ?, `price` = ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.genres,
        req.body.price,
    ];
    db.query(q, [...values, gameId], (err, data) => {
        if (err) return res.send(err)
        return res.json("Game has been updated successfully")
    })
})

app.post("/register", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    bcrypt.hash(password, soltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }
        db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hash],
            (err, result) => {
                console.log(err)
            }
        )
    })

})

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})

app.get("/users", (req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result
                        console.log(req.session.user)
                        res.send(result)
                    } else {
                        res.send({ message: "Wrong username or password" })
                    }
                })
            } else {
                res.send({ message: "User doesn't exist" })
            }
        }
    )
})

app.listen(5000, () => {
    console.log("Connected to server!")
})


