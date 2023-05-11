import ModelCategorias from '../../../../../models/categorias/index.js';
import ModelObjetos from '../../../../../models/objetos/index.js';

class CadObjetos{

    constructor(){
        this.select = document.querySelector("#id_categoria");
        this.modelCategorias = new  ModelCategorias();
        this.modelObjetos = new  ModelObjetos();
    }

    limparRedirecCadProdLocalStorage(){        
        localStorage.setItem("RedirecCadProd","");
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
            let RedirecCadProd = "http://localhost/smd/projeto/src/views/adm/objetos/subtelas/cadastro/";
            localStorage.setItem("RedirecCadProd", RedirecCadProd); 
            
            //para quando ele retornar nao perder os valores dos campos
            localStorage.setItem("img_end", document.getElementById("img_endereco").value); 
            localStorage.setItem("local", document.getElementById("local").value); 
            localStorage.setItem("descricao", document.getElementById("descricao").value); 

            window.location.href = "http://localhost/smd/projeto/src/views/adm/categorias/subtelas/cadastro/";            
        });
        
        
    }

    recolocarDadosFormularios(){        
        
         if(localStorage.getItem("img_end") || localStorage.getItem("local") || localStorage.getItem("descricao")){
            document.getElementById("img_endereco").value = localStorage.getItem("img_end");
            document.getElementById("local").value = localStorage.getItem("local"); 
            document.getElementById("descricao").value  = localStorage.getItem("descricao");

            localStorage.removeItem("img_end");
            localStorage.removeItem("local");
            localStorage.removeItem("descricao");

         }        

        
    }

    salvar(){        
        document.querySelector("#btnSalvar").addEventListener("click", (e)=>{             
            e.preventDefault();          

            let formData = new FormData(document.querySelector("#formularioObjetos"));            
            let endRedirec = "http://localhost/smd/projeto/src/views/adm/objetos/";            
                     
           this.modelObjetos.inserir(endRedirec, formData);       
            
        
       });
    }
    
    
}

const cadObjetos = new CadObjetos();
cadObjetos.selecionarCategorias();
cadObjetos.irParaCadCat();
cadObjetos.salvar();
cadObjetos.limparRedirecCadProdLocalStorage();
cadObjetos.recolocarDadosFormularios();