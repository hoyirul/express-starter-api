module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', { timestamps: false });
  const Role = sequelize.define('role', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'id'
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'role'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'roles',
    underscored: true
  });

  Role.hasMany(User);

  return Role;
}