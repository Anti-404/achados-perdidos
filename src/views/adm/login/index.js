    import ModelAdms from '../../../models/login/index.js';
    
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
            const usuario = document.querySelector('#usuario').value;
            const senha = document.querySelector('#senha').value; 
            const endRedirec = "http://localhost/smd/projeto/src/views/adm/painel/";
            
            const modelAdms = new ModelAdms();            
            modelAdms.logar(endRedirec, {usuario, senha});
            
        }

       
        verificarLogadoLogin(){
            
            if(localStorage.getItem("hash")){
                
       
                window.location.href = "http://localhost/smd/projeto/src/views/adm/painel";
       
                
            }         
        }
        
    }

    const adms = new Adms();
    adms.verificarLogadoLogin();
    