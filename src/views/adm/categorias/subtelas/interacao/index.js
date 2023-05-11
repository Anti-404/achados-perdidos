import ModelCategorias from '../../../../../models/categorias/index.js';

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
        const endRedirec = "http://localhost/smd/projeto/src/views/adm/categorias/";
        const id = this.identificador;

        document.querySelector("#btnEditar").addEventListener("click",(e)=>{                        
            e.preventDefault();

            let nome = document.querySelector("#nome").value;
            this.modelCategorias.editar(endRedirec,{ id, nome}); 
        });


    }

    excluir(){
        const endRedirec = "http://localhost/smd/projeto/src/views/adm/categorias/";
        const id = this.identificador;

        document.querySelector("#btnExcluir").addEventListener("click",(e)=>{            
            e.preventDefault();

            this.modelCategorias.excluir(endRedirec, id); 
        });
    }

    habilitarBtn(){
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