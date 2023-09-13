import axios from 'axios';

class ApiService {
    apiBase = process.env.REACT_APP_API_BASE;
    constructor() {
        if (ApiService.exists) {
          return ApiService.instance;
        }
      }
    async add(toDoData) {
        const newToDo = await axios.post(this.apiBase, toDoData);
        return newToDo;
    }
    async get() {
      const allToDos = await axios.get(this.apiBase);
      return allToDos;
    }
    async delete(id) {
      const deleted = await axios.delete(`${this.apiBase}/${id}`)
    }
}
export default ApiService;