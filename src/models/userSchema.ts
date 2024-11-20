import mongoose, { Schema, Document, Model} from "mongoose";

export interface IUser extends Document {
    email: string;
    password?: string;
    googleId?: string;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
