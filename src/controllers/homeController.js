const Agenda = require("../models/AgendaModel")

exports.index = async (req, res)=>{
    
    const agendas = await Agenda.buscaNaAgenda()
    
    res.render("index", { agendas })
    
}

