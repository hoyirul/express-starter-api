const Validator = require('fastest-validator');
const { QueryTypes } = require('sequelize');
const { role } = require('./../../models');
const db = require('./../../models');
const v = new Validator();

// for get all data from role table
const index = async (req, res) => {
    const response = await db.sequelize.query("SELECT * FROM roles", { type: QueryTypes.SELECT });
    res.status(200).json(response);
}

// for insert data to role table
const store = async (req, res) => {
    const schema = {
        role: 'string',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res
            .status(400)
            .json(validate);
    }

    await role.create(req.body);

    res.status(201).json({message: 'Data was inserted!'});
}

// for get data by id from role table
const show = async (req, res) => {
    const id = req.params.id;
    const response = await role.findByPk(id, {
        attributes: ['id', 'role', 'created_at', 'updated_at']
    });

    res.status(200).json(response || {});
}

// for update data from role table
const update = async (req, res) => {
    const id = req.params.id;

    let data = await role.findByPk(id, {
        attributes: ['id', 'role', 'created_at', 'updated_at']
    });

    if(!data){
        return res.json({message: "Data not found!"});
    }

    const schema = {
        role: 'string|optional',
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

// for delete data from role table
const destroy = async (req, res) => {
    const id = req.params.id;
    let data = await role.findByPk(id);

    if(!data){
        return res.json({message: "Data not found!"});
    }

    await data.destroy(id);

    res.status(200).json({message: "Data was deleted!"});
}
module.exports = {
    index, store, show, update, destroy
}