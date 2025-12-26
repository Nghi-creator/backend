import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('./data/orders.json', 'utf-8'));

const service = {
  findAll: async function() {
    return data;
  },

  findById: async function(id) {
    return data.find((o) => o.id === id);
  },

  create: async function (order) {
    const id = data.length + 1;
    const newOrder = {
      id,
      ...order,
    };
    data.push(newOrder);
    this.save();
    return newOrder;
  },

  update: async function(order) {
    const found = data.find(o => o.id === order.id);
    found.recipient = order.recipient;
    found.houseNumber = order.houseNumber;
    found.street = order.street;
    found.wardId = found.wardId;
    found.provinceId = found.provinceId;
    this.save();
    return found;
  },

  removeById: async function(id) {
    const found = data.find(o => o.id === id);
    const index = data.indexOf(found);
    data.splice(index, 1);
    this.save();
  },

  save: function() {
    writeFileSync('./data/orders.json', JSON.stringify(data, null, 2));
  },
};

export default service;