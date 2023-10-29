import { post } from "../../../helper";

const baseUrl = "authentication/"

class AuthenticationService {
    signUp(data) {
        return post(`${baseUrl}/signup`, data);
    }

    signIn(data) {
        return post(`${baseUrl}/signin`, data);
    }
  }
  
  export default Object.freeze(new AuthenticationService());