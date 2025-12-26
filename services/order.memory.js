const data = [{
  id: 1,
  recipient: 'Kha Do',
  houseNumber: '227',
  street: 'Nguyễn Văn Cừ',
  provinceId: 12,
  wardId: 4108,
}];

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
    return newOrder;
  },

  update: async function(order) {
    const found = data.find(o => o.id === order.id);
    found.recipient = order.recipient;
    found.houseNumber = order.houseNumber;
    found.street = order.street;
    found.wardId = found.wardId;
    found.provinceId = found.provinceId;
    return found;
  },

  removeById: async function(id) {
    const found = data.find(o => o.id === id);
    const index = data.indexOf(found);
    data.splice(index, 1);
  },
};

export default service;