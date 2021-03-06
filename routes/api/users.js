const express = require('express');
const req2 = require('express/lib/request');

// Single routing
const router = express.Router(); //this function create a new router object to handle requests.

const uuid = require("uuid");
let users = require("../../Users"); //file with json data

router.use(express.json()); //need in create api 




router.post('/test', (req, res) => {
    console.log(req.body)
    res.json({requestBody: req.body})  // <==== req.body will be a parsed JSON object

  })


// Api that get all users
router.get("/",(req,res) => {

    res.json(users); // <==== users will be a parsed JSON object
  
});

//Api that get users by ID

router.get("/:id",(req,res) => {

const found = users.some(user => user.id === parseInt(req.params.id));

if(found){
    res.json(users.filter(user => user.id === parseInt(req.params.id)));

}else{
    res.sendStatus(400);
}

});

//Api that create new users
router.post('/',(req, res) => {

    const newUser = {

        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    users.push(newUser)
    res.json(users);
});


// update api
router.put('/:id',(req,res) => {
 
   const found = users.some(user => user.id === parseInt(req.params.id))
   if(found){

    const updateUser = req.body;
    users.forEach(user =>{
        if(user.id === parseInt(req.params.id))
        {
            user.name = updateUser.name ? updateUser.name: user.name
            user.email = updateUser.email  ? updateUser.email: user.email
            res.json({msg :'User Updated', user})
        }
    })
   }
});

//Delete Api 
router.delete('/:id',(req,res) => {

    const found = users.some(user => user.id === parseInt(req.params.id))

    if(found)
    {
        //Delete operation
        
        users = users.filter((user) => user.id !== parseInt(req.params.id))
        res.json({
            msg: 'User Deleted',
            users,
        });
    }else{
        res.sendStatus(400);
    }
});


module.exports = router;
