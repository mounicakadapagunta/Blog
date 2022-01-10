const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } //to update the post time
);

module.exports = mongoose.model('Category', CategorySchema);