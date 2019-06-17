
const context = require('../configs/connections');

module.exports = {
    insert: async (object) => {
        return await context('Authenticate').returning('*').insert(object);
    },
    getById: async (id) => {
        return await context('Authenticate').where({ Id: id }).first();
    },
    getByCondition: async (condition) => {
        return await context('Authenticate').where(condition).first();
    },
    delete: async (id) => {
        return await context('Authenticate').where({ Id: id }).del();
    },
    
}