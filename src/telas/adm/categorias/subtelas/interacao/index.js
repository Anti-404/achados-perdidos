import ModelCategorias from '../../Model/index.js';

class IntCategorias{

    constructor(){        
        this.modelCategorias = new  ModelCategorias();
        this.identificador = this.recuperarIdUrl();        
    }

    recuperarIdUrl(){
        let url = (window.location.href).split("/");        
        url = url[url.length-1];
        let identificador = url.split("=")[1]; 
    
        return identificador;    
    }

    async pegarCategoria(){    
                
        let categoria = await this.modelCategorias.pegarUm(this.identificador);     
        if(!categoria.erro){
            document.querySelector("#nome").value = categoria.result.nome;
        }else{
            alert(categoria.erro);
        }        

        
    } 
    
    editar(){
        document.querySelector("#btnEditar").addEventListener("click",()=>{                        
            let nome = document.querySelector("#nome").value;
            this.modelCategorias.editar(this.identificador, nome); 
        });


    }

    excluir(){
        document.querySelector("#btnExcluir").addEventListener("click",()=>{           
            this.modelCategorias.excluir(this.identificador); 
        });
    }

    habilitarBtn(campo){
        document.querySelector("#nome").addEventListener("focus",()=>{
            document.querySelector("#btnEditar").removeAttribute("disabled");  
        });

    }
     
}

const cadCategorias = new IntCategorias();
cadCategorias.pegarCategoria();
cadCategorias.editar();
cadCategorias.excluir();
cadCategorias.habilitarBtn();