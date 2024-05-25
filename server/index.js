const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./model/user")
const userloginModel = require("./model/user")
const cors = require("cors")
const bcrypt = require('bcryptjs');

const app = express();


app.use(bodyParser.json());
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/crud")
.then(() => console.log("connected"))


app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error });
  }
});







app.get('/', (req, res) => {
    res.send('Hello World!');
  });


app.post("/creatUser" , async  (req , res) => {
    try {
        const { name, email, adress , age } = req.body;
        const user = new userModel({ name, email, adress,age  });
        await user.save();
        res.status(201).json({ message: 'User created successfully', userModel });
      } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
      }
})


app.delete('/user/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await userModel.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting user', error });
    }
  });


  app.get('/users', async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching users', error });
    }
  });

  app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      
      const existingUser = await userloginModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new userloginModel({ name, email, password:hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error registering user', error });
    }
  });



  // Route pour mettre à jour un utilisateur par ID
app.put('/users/update/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const{ name, email, adress , age } = req.body;
     
      const user = await userModel.findByIdAndUpdate(
        userId,
        { name, email, adress , age },
        
      );
      if (!userModel) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(400).json({ message: 'Error updating user', error });
    }
  });

app.listen(3001 ,() => {
    console.log(`Server is running on port 3001`);

});