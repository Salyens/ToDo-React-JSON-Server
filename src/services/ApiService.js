import axios from "axios";

class ApiService {
  apiBase = process.env.REACT_APP_API_BASE;

  constructor() {
    if (ApiService.exists) {
      return ApiService.instance;
    }
  }
  async add(toDoData) {
    const newToDo = await axios.post(`${this.apiBase}`, toDoData);
    return newToDo;
  }
  async get() {
    const allToDos = await axios.get(
      `${this.apiBase}?_sort=checked&_order=asc`
    );
    return allToDos;
  }
  async delete(id) {
    const deleted = await axios.delete(`${this.apiBase}/${id}`);
    return deleted;
  }
  async done(id, checkedValue) {
    const done = await axios.patch(`${this.apiBase}/${id}`, {
      checked: !checkedValue,
    });
    return done;
  }
  async update(id, updatedText) {
    const updated = await axios.patch(`${this.apiBase}/${id}`, {
      text: updatedText,
    });
    return updated;
  }
}
export default ApiService;
