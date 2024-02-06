class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.BASE_URL}/characters`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getOneRegister(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.BASE_URL}/characters/${id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  createOneRegister(characterInfo) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.BASE_URL}/characters`, characterInfo)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  updateOneRegister(id, characterInfo) {
    return new Promise((resolve, reject) => {
      axios.put(`${this.BASE_URL}/characters/${id}`, characterInfo)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  deleteOneRegister(id) {
    return new Promise ((resolve, reject) => {
      axios.delete(`${this.BASE_URL}/characters/${id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}







