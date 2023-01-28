const { user } = require('./../../models');

// for get all data from user table
const index = async (req, res) => {
    const response = await user.findAll({
        attributes: ['id', 'name', 'email', 'password', 'role_id', 'created_at', 'updated_at']
    });

    res.status(200).json(response);
}

module.exports = {
    index
}