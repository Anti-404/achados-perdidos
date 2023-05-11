import ModelObjetos from '../../../models/objetos/index.js';
import ModelCategorias from '../../../models/categorias/index.js';

class Objetos{

    constructor(){        
        this.modelObjetos = new  ModelObjetos();
        this.modelCategorias = new  ModelCategorias();
        this.corpoTabela = document.querySelector("tbody");
    }

    async mostrarTodos(){        
        
        const todosObjetos = await this.modelObjetos.pegarTodos();
        
        if(!todosObjetos.error){  
                      
            for (let i = 0; i < todosObjetos.result.length; ++i) {
                let tr = document.createElement("tr");
                const tds = [];

                let count = 0;
                for (let prop in todosObjetos.result[i]) {                    
                    tds.push(document.createElement("td"));                                       
                    tds[count].setAttribute("data",todosObjetos.result[i].id);
                    tds[count].appendChild(document.createTextNode(todosObjetos.result[i][prop]));
                    tr.appendChild(tds[count]);
                    ++count;                    
                }                                  

                this.corpoTabela.appendChild(tr);
                
            }

            
        }       

    }

    irParaInteracao(){  
        const tds =  document.querySelectorAll("tbody");
        for (let i = 0; i < tds.length; i++) {

            tds[i].addEventListener("click", (e)=>{            
                let id = e.target.getAttribute("data")     
                
                window.location.href = `http://localhost/smd/projeto/src/views/adm/objetos/subtelas/interacao/?id=${id}`;
                
            });            
        }       

        
       
    }

    irParaCadObj(){
        document.querySelector("#btnCadObj").addEventListener("click",(e)=>{            
            e.preventDefault();              
            window.location.href = "http://localhost/smd/projeto/src/views/adm/objetos/subtelas/cadastro/";           
            
        });
        
    }

    async selecionarCategorias(){         
        
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
       
                     
       const lis =  document.querySelectorAll("ul li");

        for (let i = 0; i < lis.length; i++) {

            lis[i].addEventListener("click", async (e)=>{            
                let idCategoria = e.target.getAttribute("data-id")     
                const todosObjetos = await this.modelObjetos.pegarPorCategoria(idCategoria);                

                document.querySelector("tbody").innerHTML = "";
                
                document.querySelector("tbody").innerHTML = "";
                console.log(todosObjetos);
                if(!todosObjetos.error){ 
                    
                    for (let i = 0; i < todosObjetos.result.length; ++i) {
                        let tr = document.createElement("tr");
                        const tds = [];
        
                        let count = 0;
                        for (let prop in todosObjetos.result[i]) {                    
                            tds.push(document.createElement("td"));                                       
                            tds[count].setAttribute("data",todosObjetos.result[i].id);
                            tds[count].appendChild(document.createTextNode(todosObjetos.result[i][prop]));
                            tr.appendChild(tds[count]);
                            ++count;                    
                        }                                  
        
                        this.corpoTabela.appendChild(tr);
                        
                    }
        
                    
                } 
                
            });            
        }
       

    }

}

const objetos = new Objetos();
objetos.mostrarTodos();
objetos.irParaInteracao();
objetos.irParaCadObj();
objetos.selecionarCategorias();

