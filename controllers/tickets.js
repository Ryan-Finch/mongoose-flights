const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  new: newTicket,
  create,
  delete: deleteTicket
};
function deleteTicket(req,res){
  
  Ticket.findByIdAndRemove(req.params.id, function(err,doc){
    // console.log(req.params.id)
    if(err)console.log(err)
    
    res.redirect('/flights')
  });
}
function create(req,res){
    Ticket.create(req.body, function(err, ticket){
      if(err) console.log(err)
      res.redirect(`/flights/${req.body.flight}`)
})
}
function newTicket(req,res){
    Flight.findById(req.params.id, function(err, flight){
      if(err)console.log(err)
      res.render('tickets/new',{title: 'Add Ticket', flight})
    })
}