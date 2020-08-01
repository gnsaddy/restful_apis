import express from 'express';
import {v4 as uuidv4} from 'uuid';

const router = express.Router();
let users = []

// all routes are starting with /users
router.get('/', ((req, res) => {
    console.log(users)
    res.send(users)
}))

router.post('/', (req, res) => {
    console.log("Post route reached")
    console.log(req.body)
    const user = req.body;
    // spread operator
    users.push({...user, id: uuidv4()})
    res.send(`user with the name ${user.firstName} added to the database!`)
})

// /users/2 => req.params
router.get('/:id', ((req, res) => {
    console.log(req.params)
    const {id} = req.params
    const foundUser = users.find((user) => user.id === id);
    res.send(foundUser)
}))

router.delete('/:id', ((req, res) => {
    console.log(req.params)
    const {id} = req.params
    users = users.filter((user) => user.id !== id)
    res.send(`User with the id ${id} deleted from the database`);
}))

router.patch('/:id', (((req, res) => {
    console.log(req.params)
    const {id} = req.params
    const {firstName, lastName, age} = req.body
    const user = users.find((user) => user.id === id);
    if(firstName) user.firstName = firstName
    if(lastName) user.lastName = lastName
    if(age) user.age = age
    res.send(`User with the id ${id} has been updated`)
})))

export default router;