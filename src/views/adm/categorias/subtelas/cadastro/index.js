import ModelCategorias from '../../../../../models/categorias/index.js';

class CadCategorias{

    constructor(){        
        this.modelCategorias = new  ModelCategorias();
        
    }
    
    salvar(){        
        document.querySelector("#btnSalvar").addEventListener("click", (e)=>{ 
            e.preventDefault();
            
            let nome = document.querySelector("#nome").value; 
            
            let endRedirec = '';

            if(localStorage.getItem("RedirecCadProd")){
                endRedirec = localStorage.getItem("RedirecCadProd");
            }else{
                endRedirec = "http://localhost/smd/projeto/src/views/adm/categorias/";  
            }
             
                         
            this.modelCategorias.inserir(endRedirec, {nome: nome});           
        
       });
    }

}

const cadCategorias = new CadCategorias();
cadCategorias.salvar();