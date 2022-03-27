const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const BoardModel = require('../models/board');


router.get('/', async(req, res, next ) => {
  const boards = await BoardModel.find().sort({"createdAt": -1});
  res.render('index', {boards});
  
});

router.get('/detail/:id', async(req, res, next) => {
  const board = await BoardModel.findById(req.params.id);
  res.render('detail', {board});
});

router.get('/write', async(req, res, next) => {
  res.render('write');
});

router.post('/submit', async(req, res, next) => {
  await BoardModel.create(req.body);
  res.redirect('/');
});

router.post('/delete', async(req, res, next) => {
  await BoardModel.deleteOne(req.body.id);
  res.redirect('/');
});

router.get('/edit/:id', async(req, res, next) => {
  const board = await BoardModel.findById(req.params.id);
  res.render('edit', {board});
});

router.post('/update/:id', async(req, res, next) => {
  await BoardModel.updateOne({ _id: req.params.id }, req.body);
  res.redirect('/detail/'+req.params.id);
});

router.get('/datatable', async(req, res, next) => {
  res.render('datatable');
})

module.exports = router;


/**
 *  Mongoose CRUD 
 *  Create ::::::::::::::::: BoardModel.create(req.body)
 *  Read ::::::::::::::::::: BoardModel.find(req.body)
 *  List ::::::::::::::::::: BoardModel.findById(req.body)
 *  Update ::::::::::::::::: BoardModel.updateOne({ _id: req.params.id }, req.body)
 *  Delete ::::::::::::::::: BoardModel.deleteOne(req.body.id)
 */
