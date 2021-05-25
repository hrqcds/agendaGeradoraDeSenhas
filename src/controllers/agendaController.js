const Agenda = require("../models/AgendaModel")

exports.index = (req, res) => {
    res.render("agenda", {
        agenda: {}
    })
}

exports.register = async (req, res) => {

    try{

        const agenda = new Agenda(req.body)
        await agenda.register()

        if(agenda.errors.length > 0) {
            req.flash("errors", agenda.errors)
            req.session.save(()=> res.redirect("/agenda/index"))
            return
        }

        req.flash("success", "Item registrado com sucesso")
        req.session.save(()=> res.redirect(`/agenda/index/${agenda.agenda._id}`))
        return

    }catch(e){
        console.log(e)
        return res.render("404")
    }  


}

exports.editIndex = async function(req, res){
    if(!req.params.id) return res.render("404")

    const agenda = await Agenda.buscaPorId(req.params.id)
    if(!agenda) return res.render("404")

    res.render("agenda", {agenda})
}

exports.edit = async function(req, res){
    try{
        if(!req.params.id) return res.render("404")

        const agenda = new Agenda(req.body)
        await agenda.edit(req.params.id)

        if(agenda.errors.length > 0) {
            req.flash("errors", agenda.errors)
            req.session.save(()=> res.redirect("/agenda/index"))
            return
        }

        req.flash("success", "Item editado com sucesso")
        req.session.save(()=> res.redirect(`/agenda/index/${agenda.agenda._id}`))
        return
    }catch(e){
        console.log(e)
        res.render("404")
    }

}

exports.delete = async function(req, res){
    if(!req.params.id) return res.render("404")

    const agenda = await Agenda.delete(req.params.id)
    if(!agenda) return res.render("404")

    req.flash("success", "Item apagado com sucesso")
    req.session.save(()=> res.redirect("back"))
    return
}

