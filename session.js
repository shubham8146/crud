import express from 'express'
import cors from 'cors'
import session from 'express-session'
const app = express()
app.use(cors());
app.use(session({
    secret:'apple',
    resave:false,
    cookie:{

    }
}))
app.use(express.json());
app.get('/', (req, res) => {
    res.send('login');
})
app.post('/user', (req, res) => {


}
)