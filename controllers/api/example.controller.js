const Validator = require('fastest-validator');
const { example } = require('./../../models');
const v = new Validator();

// for get all data from example table
const index = async (req, res) => {
    const response = await example.findAll();

    res.status(200).json(response);
}

// for insert data to example table
const store = async (req, res) => {
    const schema = {
        name: 'string',
        description: 'string',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res
            .status(400)
            .json(validate);
    }

    const response = await example.create(req.body);

    res.status(201).json(response);
}

// for get data by id from example table
const show = async (req, res) => {
    const id = req.params.id;
    const response = await example.findByPk(id);

    res.status(200).json(response || {});
}

// for update data from example table
const update = async (req, res) => {
    const id = req.params.id;

    let data = await example.findByPk(id);

    if(!data){
        return res.json({message: "Data not found!"});
    }

    const schema = {
        name: 'string|optional',
        description: 'string|optional',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res
            .status(400)
            .json(validate);
    }

    const response = await data.update(req.body);

    res.status(200).json(response);
}

// for delete data from example table
const destroy = async (req, res) => {
    const id = req.params.id;
    let data = await example.findByPk(id);

    if(!data){
        return res.json({message: "Data not found!"});
    }

    await data.destroy(id);

    res.status(200).json({message: "Data was deleted!"});
}
module.exports = {
    index, store, show, update, destroy
}