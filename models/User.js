import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: [3, "Username must be atleast 4 characters long"],
      maxlength: [12, "Username cannot be longer than 12 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength:[8, "Password must be atleast 8 characters long"],
      validate: {
        validator: function (value) {
          return (
            /[a-z]/.test(value) &&
            /[A-z]/.test(value) &&
            /\d/.test(value) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(value)
          );
        },
        message: 'Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character',
      },
      },
      isAdmin :{
        type: Boolean,
        default: false
      }
  },
  {
    timestamps: true,
  }
);

// userSchema.index({ username: 1 });
// userSchema.index({ email: 1 });

export default mongoose.model("User", userSchema);
