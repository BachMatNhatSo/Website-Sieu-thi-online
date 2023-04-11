const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên không được để trống'],
    },
    views: {
        type: Number,
        default: 0
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    description: {
        type: String,
        required: [true, 'Mô tả không được để trống'],
    },
    downloads: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            review:[
                {
                    name: {
                        type: String,
                        required: true
                    },
                    rating:{
                        type: Number,
                        default: 0,
                        required:true
                    },
                    comment:{
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ],
    category: {
        type: String,
        required: [true, 'Vui lòng chọn danh mục cho game này'],
        enum: {
            values: [
                'Action Games',
                'Arcade Games',
                '3D Games',
                'Racing Games'
            ],
            message: 'Vui lòng chọn đúng danh mục cho game'
        }
    },
    isPositive:{
        type: Boolean,
        default: false
    },
    required: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Game', gameSchema)