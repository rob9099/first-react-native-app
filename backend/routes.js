const express = require ('express');
const router = express.Router();
const toDoModel = require('./toDoSchema');




router.get('/getToDoItems', (request, response) =>{

    toDoModel.find()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))
})



router.post('/search', (request, response) =>{

    toDoModel.find({ value: { $regex: '^' + request.body.searchTerm, $options: "i" } })
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))
})



router.post('/newToDo', (request, response) =>{
    
    const newToDO = new toDoModel({
        value: request.body.value,
        category: "toDo"
    })
    newToDO.save()
    response.json('To-Do item created')
})


router.patch('/changeCategory', async (request, response) =>{
    
    try{
        await toDoModel.findByIdAndUpdate({_id: request.body._id},{category: request.body.category});
        response.json('Category changed');
    }
    catch (error){
        console.log(error.message)
    };
})


router.post('/deleteOneToDo', (request, response) =>{

    const deleteOneToDO = new toDoModel({
        _id: request.body._id
    })
    deleteOneToDO.deleteOne()
    response.json('To-Do item deleted')
})




module.exports = router;