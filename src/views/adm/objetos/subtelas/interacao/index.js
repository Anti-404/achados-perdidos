import ModelCategorias from '../../../../../models/categorias/index.js';
import ModelObjetos from '../../../../../models/objetos/index.js';

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
            document.querySelector("#img_endereco").value = objeto.result.img_endereco;

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

        document.querySelector("#btnEditar").addEventListener("click",(e)=>{  
            e.preventDefault();

            let id = this.identificador;
            let img_endereco = document.querySelector("#img_endereco").value;
            let local = document.querySelector("#local").value;
            
            let id_categoria = objeto.result.id_categoria;

            let descricao = document.querySelector("#descricao").value;
            
            let status_retirada = (document.querySelector("#retirado").checked)?1:0;
            let status_reservado = (document.querySelector("#reservado").checked)?1:0;
                      
            let endRedirec = "http://localhost/smd/projeto/src/views/adm/objetos/";
            this.modelObjetos.editar(endRedirec, {id, img_endereco, local, id_categoria, descricao, status_retirada, status_reservado}); 
        });


    }

    excluir(){
        let endRedirec = "http://localhost/smd/projeto/src/views/adm/objetos/";

        document.querySelector("#btnExcluir").addEventListener("click",(e)=>{  
            e.preventDefault();

            this.modelObjetos.excluir(endRedirec, this.identificador); 
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
cadObjetos.habilitarBtn("local", "listaCategoria", "descricao", "retirado", "reservado");