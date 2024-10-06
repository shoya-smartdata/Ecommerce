const {Sequelize} = require('sequelize');


const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;



const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
});


sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully!');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = sequelize;