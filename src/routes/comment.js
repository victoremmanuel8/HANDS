const express = require("express");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Comment = require("../models/comments");
const { isLogin } = require("../utils/loginHandeler");

const commentRoute = express.Router();

commentRoute.post(
  "/postId",
  isLogin,
  [
    body("comment")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Comment field cannot be empty!"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { postId } = req.params;

    if (errors.isEmpty()) {
      const { comment } = req.body;

      try {
        const postIdObj = new mongoose.Types.ObjectId(postId);
        const postedBy = req.session.user ? req.session.user.id_usuario : null;

        let commentObj = {
          postedBy: postedBy,
          postId: postIdObj,
          text: comment,
        };

        await new Comment(commentObj).save();
        req.flash("success", "Comment posted successfully");
      } catch (err) {
        console.error("Failed to save comment:", err);
        req.flash("error", "Failed to post comment");
      }
    } else {
      req.flash(
        "error",
        errors
          .array()
          .map((e) => e.msg)
          .join(", ")
      );
    }

    res.redirect("/comment");
  }
);

commentRoute.post(
  "/:commentId/reply/:postId",
  isLogin,
  [
    body("replyText")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Reply field cannot be empty!"),
  ],
  async (req, res) => {
    const { commentId, postId } = req.params;
    const errors = validationResult(req);
    const { replyText } = req.body;

    if (errors.isEmpty()) {
      try {
        const postIdObj = new mongoose.Types.ObjectId(postId);
        const postedBy = req.session.user ? req.session.user.id_usuario : null;

        const replyObj = {
          postedBy: postedBy,
          postId: postIdObj,
          text: replyText,
          parentComment: commentId,
        };

        const newReply = await new Comment(replyObj).save();
        await Comment.findOneAndUpdate(
          { _id: commentId, postId: postIdObj },
          { $push: { replies: newReply._id } }
        );
        req.flash("success", "Reply posted successfully");
      } catch (err) {
        console.log(err.message);
        req.flash("error", "Failed to post reply");
      }
    } else {
      req.flash("error", "Failed to post reply");
    }

    res.redirect("/comment");
  }
);

commentRoute.post("/:commentId/delete/:postId", isLogin, async (req, res) => {
  const { commentId, postId } = req.params;

  try {
    const postIdObj = new mongoose.Types.ObjectId(postId);

    const comment = await Comment.findOne({
      _id: commentId,
      postId: postIdObj,
    }).lean();

    if (comment && req.session.user && comment.postedBy) {
      if (comment.postedBy === req.session.user.id_usuario) {
        await Comment.deleteMany({ _id: { $in: comment.replies } });
        await Comment.deleteOne({ _id: commentId });
        req.flash("success", "Comment deleted successfully");
      } else {
        req.flash("error", "You do not have permission to delete this comment");
      }
    } else {
      req.flash("error", "Comment or user not found");
    }
  } catch (err) {
    console.log(err.message);
    req.flash("error", "Failed to delete comment");
  }

  res.redirect("/comment");
});

module.exports = commentRoute;
