import { Schema, model} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const userSchema = Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

userSchema.pre("save", async function(next){
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password, 10)
        } 
        next();
    })
    userSchema.pre('findOneAndUpdate', async function(next){
        const update = this.getUpdate();
        if(update.password){
            update.password = await bcrypt.hash(update.password, 10);
        }
        this.setUpdate(update)
        next()
    })

    userSchema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password, this.password);
    }

    userSchema.methods.generateJwtToken = async function(){
            return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                name: this.name,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }

export const User = model('User', userSchema)