const { getPagingData, getPagination } = require('../../middleware/pagination.middleware');
const { user } = require('./../../models');

// for get all data from user table
const index = async (req, res) => {
    const response = await user.findAll({
        attributes: ['id', 'name', 'email', 'password', 'role_id', 'created_at', 'updated_at']
    });

    res.status(200).json(response);
}

const paginationTestUsers = (req, res) => {
    const { page, size } = req.query;
    // var condition = productId ? { productId: { [Op.like]: `%${productId}%` } } : null;

    const { limit, offset } = getPagination(page, size);

    user.findAndCountAll({ limit, offset, attributes: ['id', 'name', 'email', 'role_id', 'created_at'] })
    .then(data => {
      const response = getPagingData(page, limit, data);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}

module.exports = {
    index, paginationTestUsers
}