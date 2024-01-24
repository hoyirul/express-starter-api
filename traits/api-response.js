module.exports = {
  success: (res, data, code) => {
    return res.status(code).json(data);
  },

  errors: (res, message, code) => {
    return res.status(code).json(message);
  }
};
