const mongoose = require('mongoose');
const Flight = require('../models/flight')

module.exports = {
    new: newFlight,
    create,
    index,
    show,
    delete: deleteFlight,
};
function deleteFlight(req,res){
    Flight.findByIdAndRemove(req.params.id,function(err,doc){
        console.log(req.params.id)
        res.redirect('/flights')
    });
    
}
function show(req,res){

    Flight.findById(req.params.id,function(err, flight){
        if(err) return res.render('flights/index')
        flight.destination.sort(function(a,b){
            return a.arrivalTime - b.arrivalTime;
        })
        var dt = flight.departs;
        var arrivalDate = `${dt.getFullYear()}-${(dt.getMonth()+ 1).toString().padStart(2, '0')}-${dt.getDate() + 1}T${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
        res.render('flights/show', {flight, title: 'Edit Flight', arrivalDate})
    })
}
function index(req,res){
    Flight.find({}, function(err, flights){
        if(err)return res.render('flights/new')
        res.render('flights/index', {flights, title: 'All Flights'})
    }).sort({'departs': 1})
};
function create(req, res){
    let flight = new Flight(req.body);

    flight.save(function(err){
             
        if(err) return res.redirect('flights/new');
        res.redirect('/flights')
    })
};
function newFlight(req,res){
    const newFlight = new Flight();
    var dt = newFlight.departs;

    var destDate = `${dt.getFullYear() + 1}-${(dt.getMonth()+ 1).toString().padStart(2, '0')}-${dt.getDate()}T${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
  
    res.render('flights/new', {destDate, title: 'Add Flight'})
};