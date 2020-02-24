const mongoose = require('mongoose');
const Flight = require('../models/flight')

module.exports = {
    new: newFlight,
    create,
    index,
    show
};
function show(req,res){
    Flight.findById(req.params.id, function(err, flight){
        if(err) return res.render('flights/index')
        res.render('flights/show', {flight})
    })
}
function index(req,res){
    Flight.find({}, function(err, flights){
        if(err)return res.render('flights/new')
        console.log(flights)
        res.render('flights/index', {flights})
    }).sort({'departs': 1})
};
function create(req, res){
    let flight = new Flight(req.body);

    flight.save(function(err){
             
        if(err) return res.render('flights/index');
        res.redirect('/flights')
    })
};
function newFlight(req,res){
    const newFlight = new Flight();
    var dt = newFlight.departs;

    var destDate = `${dt.getFullYear() + 1}-${(dt.getMonth()+ 1).toString().padStart(2, '0')}-${dt.getDate()}T${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
  
    res.render('flights/new', {destDate})
};