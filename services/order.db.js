let orders = [];
let nextId = 1;

const service = {
  findAll: async function() {
    return orders;
  },

  findById: async function(id) {
    return orders.find(o => o.id == id);
  },

  create: async function (order) {
    const newOrder = { 
      ...order, 
      id: nextId++,
      createdAt: new Date(), 
    };
    orders.push(newOrder);
    return newOrder;
  },

  update: async function(order) {
    const index = orders.findIndex(o => o.id == order.id);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...order };
      return orders[index];
    }
    return null;
  },

  removeById: async function(id) {
    orders = orders.filter(o => o.id != id);
  },
};

export default service;