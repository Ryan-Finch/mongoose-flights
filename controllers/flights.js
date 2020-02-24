const mongoose = require('mongoose');
const Flight = require('../models/flight')

module.exports = {
    new: newFlight,
    create,
    index,
};
function index(req,res){
    Flight.find({}, function(err, flights){
        if(err)return res.render('flights/new')
        res.render('flights/index', {flights})
    }).sort({'departs': 1})
}
function create(req, res){
    let flight = new Flight(req.body);

    flight.save(function(err){
             
        if(err) return res.render('flights/new');
        console.log(flight)
        res.redirect('/flights')
    })
}
function newFlight(req,res){
    const newFlight = new Flight();
    var dt = newFlight.departs;
    console.log(dt)
    var destDate = `${dt.getFullYear() + 1}-${dt.getMonth() + 9}-${dt.getDate()}T${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;  
    res.render('flights/new', {destDate})
};