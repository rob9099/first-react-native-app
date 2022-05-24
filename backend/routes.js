const express = require ('express');
const router = express.Router();
const toDoModel = require('./mongooseSchemas/toDoSchema');
const inProgressModel = require('./mongooseSchemas/inProgressSchema');
const doneModel = require('./mongooseSchemas/doneSchema');



router.get('/getToDoItems', (request, response) =>{

    toDoModel.find()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))
})


router.get('/getInProgressItems', (request, response) =>{

    inProgressModel.find()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))
})


router.get('/getDoneItems', (request, response) =>{

    doneModel.find()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))
})



router.post('/newToDo', async (request, response) =>{

    const newToDO = new toDoModel({
        toDo: request.body.toDo
    })
    newToDO.save()
    response.json('To-Do item created')
})


router.post('/newInProgress', async (request, response) =>{

    const newInProgress = new inProgressModel({
        inProgress: request.body.inProgress
    })
    newInProgress.save()
    response.json('In progress item created')
})


router.post('/newDone', async (request, response) =>{

    const newDone = new doneModel({
        done: request.body.done
    })
    newDone.save()
    response.json('Done item created')
})

router.post('/deleteOneToDo', async (request, response) =>{

    const deleteOneToDO = new toDoModel({
        _id: request.body._id
    })
    deleteOneToDO.deleteOne()
    response.json('To-Do item deleted')
})


router.post('/deleteOneInProgress', async (request, response) =>{

    const deleteOneInProgress = new inProgressModel({
        _id: request.body._id
    })
    deleteOneInProgress.deleteOne()
    response.json('In-Progress item deleted')
})


router.post('/deleteOneDone', async (request, response) =>{

    const deleteOneDone = new doneModel({
        _id: request.body._id
    })
    deleteOneDone.deleteOne()
    response.json('Done item deleted')
})




module.exports = router;