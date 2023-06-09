import { user } from "../interfaces";
import apiClient from "./api-client";
class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClient.get<user[]>("/users", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
  addNewUser(user: user) {
    return apiClient.post("/users", user);
  }
  updateUser(user: user) {
    return apiClient.patch("/users/" + user.id, user);
  }
  deleteUser(user: user) {
    return apiClient.delete("/users/" + user.id);
  }
}

export default new UserService();
