import CrudOperations from "../../core/repositories/crud.repository.js"
import {User} from "./user.model.js"


class UserRepository extends CrudOperations {
    constructor(){
        super(User);
    }
}

export default new UserRepository();