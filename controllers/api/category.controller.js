const Validator = require('fastest-validator');
const { Category } = require('../../models');
const v = new Validator();

// for get all data from Categorys table
const index = async (req, res) => {
    const response = await Category.findAll();

    res.status(200).json(response);
}

// for insert data to Categorys table
const store = async (req, res) => {
    const schema = {
        category: 'string',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res
            .status(400)
            .json(validate);
    }

    const response = await Category.create(req.body);

    res.status(201).json(response);
}

// for get data by id from Categorys table
const show = async (req, res) => {
    const id = req.params.id;
    const response = await Category.findByPk(id);

    res.status(200).json(response || {});
}

// for update data from Categorys table
const update = async (req, res) => {
    const id = req.params.id;

    let data = await Category.findByPk(id);

    if(!data){
        return res.json({message: "Data not found!"});
    }

    const schema = {
        category: 'string|optional',
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

// for delete data from Categorys table
const destroy = async (req, res) => {
    const id = req.params.id;
    let data = await Category.findByPk(id);

    if(!data){
        return res.json({message: "Data not found!"});
    }

    await data.destroy(id);

    res.status(200).json({message: "Data was deleted!"});
}
module.exports = {
    index, store, show, update, destroy
}