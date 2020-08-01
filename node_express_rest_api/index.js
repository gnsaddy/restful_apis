import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

// using JSON data in whole application
app.use(bodyParser.json())

app.use('/users', userRoutes)

//creating route
app.get('/', (req, res) => {
    res.send('Hello from Homepage')
})


app.listen(PORT, () => {
    console.log(`Server Running on port: http://localhost:${PORT}`)
})

