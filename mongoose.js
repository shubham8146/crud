import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());
const schema = new mongoose.Schema({
    name: String,
    clas: Number,
    rollno: Number,
})
const model = mongoose.model('student', schema)
async function dbconnection() {
    await mongoose.connect('mongodb://localhost:27017/student');
    console.log('mongodb connected')
}
app.get('/', async (req, resp) => {
    const data = await model.find();
    console.log(data);
    resp.json(data);
})
app.post('/user', async (req, resp) => {
    const data = await model.create(req.body);
    resp.json(data);
    console.log(data)
})
app.delete('/user/:id', async (req, resp) => {
    const data = await model.findByIdAndDelete(req.params.id)
    resp.json(data)
})
app.put('/user/:id', async (req, resp) => {
    const data = await model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    resp.json(data);
})
dbconnection();
app.listen(2100)