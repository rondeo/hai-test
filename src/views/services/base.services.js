export default {
  post: async (url, data) => {
    try {
      return await fetch(url, {
        method: 'POST',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match 'Content-Type' header
      });
    } catch (error) {
      throw error;
    }
  },
  put: async (url, data) => {
    try {
      return await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match 'Content-Type' header
      });
    } catch (error) {
      throw error;
    }
  },
  get: async (url) => {
    try {
      return await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
      });
    } catch (error) {
      throw error;
    }
  }
};
