const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: [true, 'Description of story is required'],
    },
    imgStory: {
      type: String,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User of story is required'],
    },
  },
  { timestamps: true }
);

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
