import express from 'express'
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());
// const DB_URL="mongodb+srv://shubhamnautiyal2002_db_user:shubham09@cluster0.irzdn4x.mongodb.net/"
// const dbConnect=()=>{
//     const conn=mongoose.connect(DB_URL).then(()=>{
//         console.log("DB is Connected Successfully...")
//     })
// }
const url = 'mongodb://localhost:27017';
const dbname = 'school';
const client = new MongoClient(url);
let collection;
async function connect() {
    await client.connect();
    console.log('mongodb connected');
    const db = client.db(dbname);
    collection = db.collection('student');
}
connect();
app.get('/', async (req, resp) => {
    let data = await collection.find().toArray();
    resp.json(data);
})
app.post('/', async (req, res) => {
    let data = req.body;
    console.log('data received', req.body);
    const result = await collection.insertOne(data);
    res.json({
        success: true,
        message: 'Data received',
        data: result,
        
    })
});
app.delete('/user/:id', async (req, resp) => {
    console.log(req.params.id);
    const remove = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (remove) {
        resp.send('data was delted');
    }
    else {
        resp.send({
            message: 'data not deleted',
            success: 'false'
        })
    }
})
// app.put('/user/:id', async (req, resp) => {
//     try {
//         const id = req.params.id;
//         const updatedata = req.body;
//         const result = await collection.findOneAndUpdate(
//             { _id: new ObjectId(id) },
//             { $set: updatedata },
//             { returnDocument: 'after' }
//         )
//         if (result.value) {
//             resp.json(result.value)
//         }
//         else {
//             resp.status(404).json({ success: false, message: 'student not found' })
//         }

//     }
//     catch (error) {
//         resp.status(500).json({ success: false, message: error.message });
//     }
// })
app.put('/user/:id', async (req, resp) => {
    const id = req.params.id;
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body });
    if (result.modifiedCount > 0) {
        resp.send({
            message: 'data update',
            success: true,
            result: result,
        })

    }
    else {
        resp.send({
            message: 'data not update',
            success: false,
            result: result,
        })

    }

})

app.listen(2600, () => {
    console.log("Server running on port 2600");
    // dbConnect()
});

