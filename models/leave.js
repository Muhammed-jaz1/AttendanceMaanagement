'use strict'
module.exports = function (sequelize, DataTypes) {
  const leave = sequelize.define(
    'leave',
    {
      leave_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
       
      },
      reason:{
          type:DataTypes.STRING,
          allowNull:true
      }
    },
  )
  leave.associate = function (models) {
    leave.belongsTo(models.user,{ foreignKey: 'user_id' }) 
  }
  return leave;
}
