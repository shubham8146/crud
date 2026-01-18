import express from 'express';
import home from './files/home.js';
import form from './files/from.js'

const app = express();
app.use(express.urlencoded({ entended: false }))
// app.use((req, resp, next) => {
//     if (!req.query.age || req.query.age < 18) {
//         resp.send('you can not access this page')
//     }
//     else {
//         next();
//     }
// })

app.get('/', (req, resp) => {
    resp.send('hello')
})
app.get('/login', (req, resp) => {
    resp.send(`  <form action='submit' method='post'>
<input type="text" name='name' placeholder='enter the name' />
<br>
<br />
<input type="text" name='class' placeholder='enter the class' />
<br>
<br />
<button type='submit'>Submit</button>
</form>`)
})
app.post('/submit', (req, resp) => {
    resp.send('submit page');
    console.log(req.body);
})
app.listen(8100);           