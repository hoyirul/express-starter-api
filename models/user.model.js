module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', { timestamps: false });
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'name'
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'email'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password'
    },
    role_id: {
      type: DataTypes.BIGINT,
      references: {
        model: {
          tableName: 'roles',
        },
        key: 'id'
      },
      field: 'role_id',
      allowNull: false
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
    tableName: 'users',
    underscored: true
  });

  User.belongsTo(Role);

  return User;
}