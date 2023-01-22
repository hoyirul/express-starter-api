const Validator = require('fastest-validator');
const { Example } = require('./../../models');
const v = new Validator();

// for get all data from examples table
const index = async (req, res) => {
    const response = await Example.findAll();

    res.status(200).json(response);
}

// for insert data to examples table
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

    const response = await Example.create(req.body);

    res.status(201).json(response);
}

// for get data by id from examples table
const show = async (req, res) => {
    const id = req.params.id;
    const response = await Example.findByPk(id);

    res.status(200).json(response || {});
}

// for update data from examples table
const update = async (req, res) => {
    const id = req.params.id;

    let data = await Example.findByPk(id);

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

// for delete data from examples table
const destroy = async (req, res) => {
    const id = req.params.id;
    let data = await Example.findByPk(id);

    if(!data){
        return res.json({message: "Data not found!"});
    }

    await data.destroy(id);

    res.status(200).json({message: "Data was deleted!"});
}
module.exports = {
    index, store, show, update, destroy
}