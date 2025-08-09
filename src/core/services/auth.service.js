import bcrypt from "bcrypt";


class AuthService {

  async generateToken(user) {
    return user.generateJwtToken();
  }

  async isPasswordCorrect(user, password){
    return await bcrypt.compare(password, user.password);
  }
}

export default new AuthService;