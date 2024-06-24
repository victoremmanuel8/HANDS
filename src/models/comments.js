const { Schema, model } = require("mongoose");
const { tb_usuario } = require("./usu_model");

const commentSchema = new Schema({
  postedBy: {
    type: Number,
    required: true,
    ref: tb_usuario,
  },
  postedByName: {
    type: String,
    required: true,
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
      select: "username", 
    },
  });
  next();
});

// commentSchema.pre("find", async function (next) {
//   try {
//     let userId;
//     let profId;
//     // Exemplo: Buscar o nome do usuário ou profissional no MySQL
//     if (userId) {
//     const user = await tb_usuario.findById(this.postedBy).exec();
//     if (user) {
//       this.postedByName = user.nm_usuario; // Ou user.nm_prof, dependendo do tipo
//     }
//   }
//   if(profId){
//     const prof = await tb_profissional.findById(this.postedBy).exec();
//     if(prof) {
//       this.postedByName = prof.nm_prof;
//     }
//   }

//     next();
//   } catch (err) {
//     next(err);
//   }

const Comment = model("comments", commentSchema);
module.exports = Comment;
