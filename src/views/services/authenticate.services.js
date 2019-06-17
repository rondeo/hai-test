import baseService from './base.services';

export default {
  login: async (username, password) => {
    const response = await baseService.post('/api/accounts', {
      username: username,
      password: password
    });
    return await response.json();
  },
  register: async (username, password, fullName, mobile) => {
    const response = await baseService.post('/api/accounts/register', {
      username: username,
      password: password,
      fullName: fullName,
      mobile: mobile
    });
    return await response.json();
  },
  checkToken: async () => {
    const response = await baseService.get('/api/accounts/token');
    return await response.json();
  },
  checkSession: async () => {
    const response = await baseService.get('/api/accounts/verify-session');
    return await response.json();
  },
  addSocket: async (socket) => {
    const response = await baseService.put('/api/accounts/socket', {
      socket: socket
    });
    return await response.json();
  },
  getAll: async () => {
    const response = await baseService.get('/api/accounts/users');
    return await response.json();
  }
}