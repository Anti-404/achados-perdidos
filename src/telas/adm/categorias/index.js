import ModelCategorias from './Model/index.js';

class Categorias{
    constructor(){        
        this.modelCategorias = new  ModelCategorias();
    } 
    
    async mostrarTodos(){    
        let corpoTabela = document.querySelector("tbody");
        
        const todasCategorias = await this.modelCategorias.pegarTodos();
        
        if(!todasCategorias.error){  
                      
            for (let i = 0; i < todasCategorias.result.length; ++i) {
                let tr = document.createElement("tr");                
                let td1 = document.createElement("td"); 
                let td2 = document.createElement("td"); 
                
                td1.setAttribute("data",todasCategorias.result[i].id); //tem que colocar o id nas duas tabelas pq eu nao consegui pegar o lick na linha
                td2.setAttribute("data",todasCategorias.result[i].id);
                

                tr.appendChild(td1);
                tr.appendChild(td2);
                td1.appendChild(document.createTextNode(todasCategorias.result[i].id));
                td2.appendChild(document.createTextNode(todasCategorias.result[i].nome));

                corpoTabela.appendChild(tr);
                
            }

            
        }       

    }

    irParaCadCat(){
        document.querySelector("#btnCadCat").addEventListener("click",()=>{            
            window.location.href = "http://localhost/smd/projeto/src/telas/adm/categorias/subtelas/cadastro/?telaAnt=categorias";
        });
        
    }

    irParaInteracao(){  
        const tds =  document.querySelectorAll("tbody");
        for (let i = 0; i < tds.length; i++) {

            tds[i].addEventListener("click", (e)=>{            
                let id = e.target.getAttribute("data")     
                
                window.location.href = `http://localhost/smd/projeto/src/telas/adm/categorias/subtelas/interacao/?id=${id}`;
                
            });            
        }       

        
       
    }

}

const categorias = new Categorias();
categorias.irParaCadCat();
categorias.mostrarTodos();
categorias.irParaInteracao();