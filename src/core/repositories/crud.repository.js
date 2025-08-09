
class CrudOperations {
    constructor(model){
        this.model = model;
    }

    async create(data){
        const newResource = new this.model(data);
        const res =  await newResource.save();
        const resourceObject = res.toObject();
        if ('password' in resourceObject){
            delete resourceObject.password;
        }
        return resourceObject;
    }

    async findMany(query){
        if(query){
            return await this.model.find(query).select('-password');
        }
        return await this.model.find({}).select('-password');
    }

    async findOne(query){
        return await this.model.findOne(query);
    }

    async findById(id){
        return await this.model.findById(id).select('-password');
    }

    async update(resourceId, data){
        return await this.model.findByIdAndUpdate(resourceId,data,{new:true}).select('-password');
    }

    async delete(resourceId){
        return await this.model.findByIdAndDelete(resourceId);
    }
}

export default CrudOperations;