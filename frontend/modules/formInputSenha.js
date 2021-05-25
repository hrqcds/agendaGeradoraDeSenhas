import gerador from "./geradorDeSenha"


export default class Senha{

    constructor(idEJS, idButton, idQTD, idMa, idMin, idNum, idSim){
        this.senhaHTML = document.querySelector(idEJS)
        this.gerarSenha = document.querySelector(idButton)
        this.qtd = document.querySelector(idQTD)
        this.mai = document.querySelector(idMa)
        this.min = document.querySelector(idMin)
        this.num = document.querySelector(idNum)
        this.sim = document.querySelector(idSim)
    }

    init(){
        this.event()        
    }

    gera(){

        const senha = gerador(
            this.qtd.value,
            this.mai.checked,
            this.min.checked,
            this.num.checked,
            this.sim.checked)

            return senha
    }

    event(){

        this.gerarSenha.addEventListener("click", e =>{
            
            e.preventDefault()   
            this.senhaHTML.value = this.gera()
              

        })

    }

}