const mongoose = require("mongoose")

const AgendaSchema = new mongoose.Schema({
    description: { type: String, required: true}, 
    password: { type: String, required: true},
    criadoEm: {type: Date, default: Date.now}     
})

const AgendaModel = mongoose.model("Agenda", AgendaSchema)

function Agenda(body){

    this.body = body
    this.errors = []
    this.agenda = null
}


Agenda.prototype.register = async function(){
    this.valida()
    if(this.errors.length > 0) return 

    this.agenda = await AgendaModel.create(this.body)

}

Agenda.prototype.valida = function(){
    this.cleanUP()
    // Validando os campos
    
    if(!this.body.description) this.errors.push("Descrição é um campo obrigatório")

    if(!this.body.password) this.errors.push("Senha é um campo obrigatório")

    if(this.body.password.length < 6 || this.body.password.length > 50){
        this.errors.push("A senha precisa ter entre 6 e 50 caracteres")
    }

}

Agenda.prototype.cleanUP= function(){
    for(const key in this.body){
        if(typeof this.body[key] !== "string"){
            this.body[key] = ""
        }
    }

    this.body = {
        description: this.body.description,
        password: this.body.password
    }
}

Agenda.prototype.edit = async function(id){
    if(typeof id !== "string") return
    
    this.valida()
    if(this.errors.length > 0) return

    this.agenda = await AgendaModel.findByIdAndUpdate(id, this.body, { new: true})
}

// Estáticos
Agenda.buscaPorId = async function(id){
    if(typeof id !== "string") return
    const agenda = await AgendaModel.findById(id)
    return agenda

}
Agenda.buscaNaAgenda = async function(){
    const agendas = await AgendaModel.find()
        .sort({criadoEM: -1})
    return agendas
}

Agenda.delete = async function(id){
    if(typeof id !== "string") return

    const agenda = await AgendaModel.findOneAndDelete({_id: id})
    return agenda
}


module.exports = Agenda