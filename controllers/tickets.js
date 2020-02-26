const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  new: newTicket,
  create,
  delete
};
function delete(req,res){
  console.log('logggg')
}
function create(req,res){
    Ticket.create(req.body, function(err, ticket){
      if(err) console.log(err)
      res.redirect(`/flights/${req.body.flight}`)
})
}
function newTicket(req,res){
    Flight.findById(req.params.id, function(err, flight){
    
      res.render('tickets/new',{title: 'Add Ticket', flight})
    })
}