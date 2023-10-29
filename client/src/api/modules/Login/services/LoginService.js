import { post } from "../../../helper";

const baseUrl = "authentication/"
// signup
class LoginService {
    signUp(data) {
        return post(`${baseUrl}/signup`, data);
    }
  }
  
  export default Object.freeze(new LoginService());