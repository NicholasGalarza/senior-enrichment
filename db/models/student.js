const Sequelize = require('sequelize'); 
const db = require('../index'); 
const DataTypes = db.Sequelize; 

const Student = db.define('student', {
    name: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    email: {
        type: DataTypes.STRING, 
        allowNull: false, 
        validate: {
            isEmail: true
        }
    }
}); 

module.exports = Student; 