'use strict'
module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define(
    'user',
    {
      user_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address:{
          type:DataTypes.STRING,
          allowNull:true

      },
      city:{
        type:DataTypes.STRING,
        allowNull:true

      },
      state:{
        type:DataTypes.STRING,
        allowNull:true

      },
      zipcode:{
        type:DataTypes.STRING,
        allowNull:true

      },
      country:{
        type:DataTypes.STRING,
        allowNull:true

      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false
      },
      role:{
          type:DataTypes.INTEGER,
          allowNull:false
      },
      isActive:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:true
      }
    },
    {
      timestamps: true,
      underscored: true
    }
  )

  user.associate = function (models) {
    user.hasMany(models.leave,{foreignKey:'user_id'})

  }

  return user;
}
