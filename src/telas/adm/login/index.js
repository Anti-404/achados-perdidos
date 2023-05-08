    import ModelAdms from './Model/index.js';
    
     class Adms{
        constructor() {
            this.formulario = document.querySelector("#formulario");
                 
            this.eventos();
        }

        eventos() {
            this.formulario.addEventListener('submit', e => {
                this.logar(e);
            });
        } 
        
        logar(e) {
            e.preventDefault();        
            const usuario = document.querySelector('#usuario');
            const senha = document.querySelector('#senha'); 
            
            const modelAdms = new ModelAdms();            
            modelAdms.logar(usuario.value, senha.value);
            
        }

        // caso a pessoa ja esteja logada e va na pagina de login ela vai direto pro painel
        verificarLogadoLogin(){
            
            //localStorage.getItem("hash") // nao vou adicionar pq o alan que ficar logado direto
            //if(sessionStorage.getItem("hash")){
            if(localStorage.getItem("hash")){
                
                //if(document.querySelector("#paginaLogin")){
                    window.location.href = "http://localhost/smd/projeto/src/telas/adm/painel";
                //}
                
            }         
        }
        
    }

    const adms = new Adms();
    adms.verificarLogadoLogin();
    