import ModelCategorias from '../../../categorias/Model/index.js';
import ModelObjetos from '../../Model/index.js';

class CadObjetos{

    constructor(){
        this.select = document.querySelector("#listaCategoria");
        this.modelCategorias = new  ModelCategorias();
        this.modelObjetos = new  ModelObjetos();
    }

    async selecionarCategorias(){         
        
        const todasCategorias = await this.modelCategorias.pegarTodos();

        if(!todasCategorias.error){                        
            for (let i = 0; i < todasCategorias.result.length; ++i) {  
                let option = document.createElement("option"); 
                option.setAttribute("value",todasCategorias.result[i].id);              
                option.appendChild(document.createTextNode(todasCategorias.result[i].nome));
                this.select.appendChild(option);                 
            }           
            
       }       

    }

    irParaCadCat(){
        document.querySelector("#btnObjCadCat").addEventListener("click",(e)=>{            
        e.preventDefault();
           window.location.href = "http://localhost/smd/projeto/src/telas/adm/categorias/subtelas/cadastro/?telaAnt=objetos";
        });
        
    }

    salvar(){        
        document.querySelector("#btnSalvar").addEventListener("click", (e)=>{             
            e.preventDefault();

            let nome = document.querySelector("#nome").value;                  
            let local = document.querySelector("#local").value; 
            let id_categoria = document.querySelector("#listaCategoria").value; 
            let descricao = document.querySelector("#descricao").value; 

            this.modelObjetos.inserir(nome, local, id_categoria, descricao);           
        
       });
    }
    
    
}

const cadObjetos = new CadObjetos();
cadObjetos.selecionarCategorias();
cadObjetos.irParaCadCat();
cadObjetos.salvar();