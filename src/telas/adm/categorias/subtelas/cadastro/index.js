import ModelCategorias from '../../Model/index.js';

class CadCategorias{

    constructor(){        
        this.modelCategorias = new  ModelCategorias();
        
    }
    
    salvar(){        
        document.querySelector("#btnSalvar").addEventListener("click", (e)=>{ 
            let nome = document.querySelector("#nome");                  
            this.modelCategorias.inserir(nome.value, this.pegarTelaAnt());           
        
       });
    }

    pegarTelaAnt(){
        let url = (window.location.href).split("/");        
        url = url[url.length-1];
        let telaAnt = url.split("=")[1]; 
    
        return telaAnt;  
    }

}

const cadCategorias = new CadCategorias();
cadCategorias.salvar();