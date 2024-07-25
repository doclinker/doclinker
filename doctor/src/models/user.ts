import mongoose, { Schema, Types } from "mongoose";


// An interface that describes the properties required to create a User.
export interface UserAttrs {
  id: string;
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1197844157.
  doctorId? :Types.ObjectId | null;
  email: string;
  dob: Date;
  gender: string;
  fullName: string;
  phoneNumber: string | null;
}

// An interface that describes the properties a User model has.
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties a User Document has.
export interface UserDoc extends mongoose.Document {
  id: string;
  doctorId? :Types.ObjectId | null;
  email: string;
  dob: Date;
  gender: string;
  fullName: string;
  phoneNumber: string | null;
}

// Schema for the user collection
const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);


/**
 * Builds a new user document
 * @param attrs - attributes for the user document
 */
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// Model for the user collection
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
