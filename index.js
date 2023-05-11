import ModelCategorias from './src/models/categorias/index.js';
import ModelObjetos from './src/models/objetos/index.js';

class Home {
    constructor(){
        this.modelCategorias = new ModelCategorias();               
        this.modelObjetos = new ModelObjetos();               
    }

    async listarCategorias(){         
        let ul = document.querySelector("#listaCategorias");
        const todasCategorias = await this.modelCategorias.pegarTodos();
        
        if(!todasCategorias.error){                        
            for (let i = 0; i < todasCategorias.result.length; ++i) {  
                let li = document.createElement("li"); 
                li.setAttribute("data-id",todasCategorias.result[i].id);              
                li.appendChild(document.createTextNode(todasCategorias.result[i].nome));
                ul.appendChild(li);                 
            }           
            
       }       
               
                
            
        }   
        
        async listarObjetos(){

            const todosObjetos = await this.modelObjetos.pegarTodos();            
            let divListaObjetos = document.querySelector(".listaObjetos .container");

            if(!todosObjetos.error){ 
                
                for (let i = 0; i < todosObjetos.result.length; ++i) {
                    let a = document.createElement("a");
                    let figure = document.createElement("figure");
                    let img = document.createElement("img");
                    let figCaption = document.createElement("figcaption");             
    
                    let count = 0;
                    for (let prop in todosObjetos.result[i]) {                    
                        
                        a.setAttribute("id",todosObjetos.result[i].id);
                        img.setAttribute("src",todosObjetos.result[i].img_endereco);
                        img.setAttribute("alt",todosObjetos.result[i].descricao);                                                        
                        ++count;                    
                    }                                  
                    
                    figure.appendChild(img);
                    figure.appendChild(figCaption);
                    a.appendChild(figure);
                    divListaObjetos.appendChild(a);
                    
                }
    
                
            } 

        }
       
       

    }





const home = new Home();
home.listarCategorias();
home.listarObjetos();
