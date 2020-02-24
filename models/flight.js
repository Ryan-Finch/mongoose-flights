const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    destinationAirport: {
        type: String,
        enum:['AUS', 'DAL', 'LAX', 'DEN', 'SAN']
    },
    arrivalTime: {
        type: Date
    },
})

const flightSchema = new Schema({
    
    airline:{
        type: String,
        enum: ['American', 'Southwest', 'United']
        },
    flightNo: {
        type: Number,
        required: true,
        min:10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function(){
         return new Date()
        }
    },
    airport:{
        type: String,
        enum:['AUS', 'DAL', 'LAX', 'DEN', 'SAN']
    },
    destination: [destinationSchema]
},
{
    timestamps: true
});


module.exports = mongoose.model('Flight', flightSchema)