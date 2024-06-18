const { Schema, model } = require("mongoose");
const { tb_usuario } = require("./usu_model");

const commentSchema = new Schema({
  postedBy: {
    type: Number,
    required: true,
    ref: tb_usuario,
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: "comments",
    default: null,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
});

// Pré-hook para população das respostas (replies)
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "replies",
    populate: {
      path: "postedBy",
      select: "username", // Especifique os campos que deseja selecionar do usuário
    },
  });
  next();
});

const Comment = model("comments", commentSchema);
module.exports = Comment;
