const express = require ('express');
const router = express.Router();
const toDoModel = require('./mongooseSchemas/toDoSchema');
const inProgressModel = require('./mongooseSchemas/inProgressSchema');
const doneModel = require('./mongooseSchemas/doneSchema');
const toDoModelv2 = require('./mongooseSchemas/toDoSchemav2');




router.get('/getToDoItems', (request, response) =>{

    toDoModelv2.find()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))
})



router.get('/search', (request, response) =>{

    toDoModelv2.find()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))
})



router.post('/newToDov2', (request, response) =>{
    console.log(request.body)
    const newToDOv2 = new toDoModelv2({
        value: request.body.value,
        category: "toDo"
    })
    newToDOv2.save()
    response.json('To-Dov2 item created')
})


router.patch('/changeCategory', async (request, response) =>{
    
    const updateItem = new toDoModelv2({
        category: request.body.category
    })
    
    let id = request.body._id
    let category = request.body.category
    
    try{
        await toDoModelv2.findByIdAndUpdate({_id: id},{category: category})
        response.json('Category changed')
    }
    catch (error){
        console.log(error.message)
    }
})


router.post('/deleteOneToDo', (request, response) =>{

    const deleteOneToDO = new toDoModelv2({
        _id: request.body._id
    })
    deleteOneToDO.deleteOne()
    response.json('To-Do item deleted')
})






/*router.get('/getToDoItems', (request, response) =>{

    toDoModel.find()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))
})*/


/*router.get('/getInProgressItems', (request, response) =>{

    inProgressModel.find()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))
})*/


/*router.get('/getDoneItems', (request, response) =>{

    doneModel.find()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))
})*/


/*router.post('/newToDo', (request, response) =>{
    console.log(request.body)
    const newToDO = new toDoModel({
        toDo: request.body.toDo
    })
    newToDO.save()
    response.json('To-Do item created')
})*/

/*router.post('/newInProgress', (request, response) =>{

    const newInProgress = new inProgressModel({
        inProgress: request.body.inProgress
    })
    newInProgress.save()
    response.json('In progress item created')
})*/


/*router.post('/newDone', (request, response) =>{

    const newDone = new doneModel({
        done: request.body.done
    })
    newDone.save()
    response.json('Done item created')
})*/


/*router.post('/deleteOneToDo', (request, response) =>{

    const deleteOneToDO = new toDoModel({
        _id: request.body._id
    })
    deleteOneToDO.deleteOne()
    response.json('To-Do item deleted')
})*/


/*router.post('/deleteOneInProgress', (request, response) =>{

    const deleteOneInProgress = new inProgressModel({
        _id: request.body._id
    })
    deleteOneInProgress.deleteOne()
    response.json('In-Progress item deleted')
})*/


/*router.post('/deleteOneDone', (request, response) =>{

    const deleteOneDone = new doneModel({
        _id: request.body._id
    })
    deleteOneDone.deleteOne()
    response.json('Done item deleted')
})*/



module.exports = router;