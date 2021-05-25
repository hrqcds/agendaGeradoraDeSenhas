import "core-js/stable"
import "regenerator-runtime/runtime"

import './assets/css/style.css';
import formInputSenha from "./modules/formInputSenha"

const gerarSenha = new formInputSenha(
    "#senhaHTML",
    "#gerarSenha",
    "#qtd",
    "#checkMaisculas",
    "#checkMinusculas", 
    "#checkNumeros", 
    "#checkSimbolos")



gerarSenha.init()

