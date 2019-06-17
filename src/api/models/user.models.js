
const context = require('../configs/connections');

module.exports = {
    getByCondition: async (condition) => {
        return await context('hai-user').where(condition).first();
    },
    findById: async (id) => {
        return await context('hai-user').where({ id: id }).first();
    },
    insert: async (object) => {
        return await context('hai-user').insert(object);
    },
    update: async (id, object) => {
        return await context('hai-user').where({ id: id }).update(object);
    },
    removeSocket: async (socket) => {
        return await context('hai-user').where({ socket: socket }).update({
            socket: null,
            isOnline: false
        });
    },
    getAll: async () => {
        return await context('hai-user').where({ type: 0 }).select('id', 'isOnline', 'name', 'mobile', 'username');
    }
}