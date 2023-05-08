import ModelCategorias from '../../../categorias/Model/index.js';
import ModelObjetos from '../../Model/index.js';

class IntObjetos{    

    constructor(){        
        this.modelCategorias = new  ModelCategorias();
        this.modelObjetos = new  ModelObjetos();
        this.identificador = this.recuperarIdUrl();                        
    }

    recuperarIdUrl(){
        let url = (window.location.href).split("/");        
        url = url[url.length-1];
        let identificador = url.split("=")[1]; 
    
        return identificador;    
    }

    async pegarObjeto(){            
        const objeto = await this.modelObjetos.pegarUm(this.identificador); 

        if(!objeto.erro){
            document.querySelector("#nome").value = objeto.result.nome;
            document.querySelector("#local").value = objeto.result.local;

            await this.selecionarCategoria(objeto.result.id_categoria);

            document.querySelector("#descricao").value = objeto.result.descricao;
            
            if(Number.parseInt(objeto.result.status_retirada)){
                document.querySelector("#retirado").setAttribute("checked","true");
            }

            if(Number.parseInt(objeto.result.status_reservado)){
                document.querySelector("#reservado").setAttribute("checked","true");
            }          
                       

        }else{
            alert(objeto.erro);
        }        
    }

    async selecionarCategoria(id_categoria){   
        //colocando as categorias no select
        const select = document.querySelector("#listaCategoria");
        const todasCategorias = await this.modelCategorias.pegarTodos();

        if(!todasCategorias.error){                        
            for (let i = 0; i < todasCategorias.result.length; ++i) {  
                let option = document.createElement("option"); 
                option.setAttribute("value",todasCategorias.result[i].id);              
                option.appendChild(document.createTextNode(todasCategorias.result[i].nome));
                select.appendChild(option);                 
            }           
            
       } 
        
        //selecionando a categoria do objeto em especifico        
        let categoria = await this.modelCategorias.pegarUm(id_categoria);   

        if(!categoria.erro){
            const options = document.querySelector("#listaCategoria").options;
            for (let i = 0; i < options.length; i++) {
                if(options[i].value == categoria.result.id){
                    options[i].selected = true;
                }                
            }
        }else{
            alert(categoria.erro);
        }        

        
    } 
    
    async editar(){
        const objeto = await this.modelObjetos.pegarUm(this.identificador); 

        document.querySelector("#btnEditar").addEventListener("click",()=>{                        
            let nome = document.querySelector("#nome").value;            
            let local = document.querySelector("#local").value;
            
            let id_categoria = objeto.result.id_categoria;

            let descricao = document.querySelector("#descricao").value;
            
            let retirado = (document.querySelector("#retirado").checked)?1:0;
            let reservado = (document.querySelector("#reservado").checked)?1:0;
                      

            this.modelObjetos.editar(this.identificador, nome, local, id_categoria, descricao, retirado, reservado); 
        });


    }

    excluir(){
        document.querySelector("#btnExcluir").addEventListener("click",()=>{           
            this.modelObjetos.excluir(this.identificador); 
        });
    }

    habilitarBtn(...campos){

        for (let i = 0; i < campos.length; i++) {
           
            document.querySelector(`#${campos[i]}`).addEventListener("focus",()=>{
                document.querySelector("#btnEditar").removeAttribute("disabled");  
            });  
            
        }       

    }
     
}

const cadObjetos = new IntObjetos();
cadObjetos.pegarObjeto();
cadObjetos.editar();
cadObjetos.excluir();
cadObjetos.habilitarBtn("nome", "local", "listaCategoria", "descricao", "retirado", "reservado");