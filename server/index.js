const express = require('express')
const app = express()
const mongoose = require('mongoose')
const FriendModel = require('./models/Friends')
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())

/// DATABASE CONNECTION
mongoose.connect(
    'mongodb+srv://myusername:mypassword@mernproject.qff9d.mongodb.net/mydatabasename?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
)

app.post('/addFriend', async (req, res) => {

    const name = req.body.name;
    const number = req.body.number;
    const friend = new FriendModel({name: name, number: number})
    await friend.save()
    res.send(friend)
})

app.get('/read', async (req, res) => {
    FriendModel.find({}, (err, result) => {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.put("/update", async (req, res) => {
    const newNumber = req.body.newNumber
    const id = req.body.id

    try {

        await FriendModel.findById(id, (error, friendUpdate) => {
            friendUpdate.number = Number(newNumber)
            friendUpdate.save()
        })

    } catch(err) {
        console.log(err)
    }

    res.send("updated")

})

app.delete("/delete/:id", async (req, res) => {
    
    const id = (req.params.id);
    await FriendModel.findByIdAndDelete(id)
    res.send("deleted")
})

app.listen(process.env.PORT || 3001, () => {
    console.log('you are connected')
})