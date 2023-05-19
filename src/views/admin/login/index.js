    import ModelAdm from '../../../models/login/index.js';
    
     class Adm{
        constructor() {
            this.form = document.querySelector("#form");             
            this.events();
        }

        events() {
            this.form.addEventListener('submit', e => {
                this.login(e);
            });
        } 
        
        login(e) {
            e.preventDefault();        
            const user = document.querySelector('#user').value;
            const password = document.querySelector('#password').value; 
            const addressRedirecting = "src/views/admin/panel/";
            
            const modelAdm = new ModelAdm();            
            modelAdm.login(addressRedirecting, {user, password});
            
        }

       
        checkUserLogged(){
            
            if(localStorage.getItem("hash")){
                
       
                window.location.href = "../panel/";
       
                
            }         
        }
        
    }

    const adms = new Adm();
    adms.checkUserLogged();
    