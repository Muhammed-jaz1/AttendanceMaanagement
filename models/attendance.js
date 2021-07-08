'use strict'
module.exports = function (sequelize, DataTypes) {
  const attendance = sequelize.define(
    'attendance',
    {
      attendance_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      markIn: {
        type: DataTypes.TIME,
        allowNull: true
      
       
      },
      markOut:{
          type:DataTypes.TIME,
          allowNull:true


      }
    },
  )
  attendance.associate = function (models) {
    attendance.belongsTo(models.user,{ foreignKey: 'user_id' }) 
  }
  return attendance;
}
