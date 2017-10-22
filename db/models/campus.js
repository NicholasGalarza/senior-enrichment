const Sequelize = require('sequelize'); 
const db = require('../index'); 
const DataTypes = db.Sequelize; 

const Campus = db.define('campus', {
    name: {
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true
    }, 
    image: {
        type: DataTypes.STRING
    }
}); 

module.exports = Campus; 