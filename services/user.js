let users = []; 
let nextId = 1;

const service = {
  findByEmail: async function (email) {
    return users.find(u => u.email === email);
  },

  create: async function (user) {
    const existingUserIndex = users.findIndex(u => u.email === user.email);

    if (existingUserIndex !== -1) {
      users[existingUserIndex].otp = user.otp;
      users[existingUserIndex].encryptedPassword = user.encryptedPassword;
      return users[existingUserIndex];
    } else {
      const newUser = {
        id: nextId++,       
        email: user.email,
        encryptedPassword: user.encryptedPassword,
        otp: user.otp,
        isActive: false,    
        isAdmin: false
      };
      users.push(newUser);
      return newUser;
    }
  },

  update: async function (user) {
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
    }
    return user;
  },

  findById: async function (id) {
    return users.find(u => u.id === id);
  }
};

export default service;