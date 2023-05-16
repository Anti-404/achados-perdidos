import ModelAdmins from '../../../../../models/login/index.js';

class Profile{    

    constructor(){                
        this.modelAdmins = new  ModelAdmins();  
        this.identifier = 7;      
    }

    async getUserAdmin(){  
        
        const userAdmin= await this.modelAdmins.get(this.identifier); 
        
        if(!userAdmin.erro){            
            document.querySelector("#user").value = userAdmin.result.user;            
            document.querySelector("#email").value = userAdmin.result.email;
            
        }else{
            alert(userAdmin.erro);
        }        
    }

    async update(){

        document.querySelector("#update-button").addEventListener("click",(e)=>{  
            e.preventDefault();

            let id = this.identifier;
            let user = document.querySelector("#user").value;
            let password = document.querySelector("#password").value;
            let email = document.querySelector("#email").value;
                      
            let addressRedirecting = "http://localhost/smd/projeto/src/views/admin/panel/";
            
            this.modelAdmins.update( addressRedirecting, {id, user, password, email }); 
        });


    }

    enableButton(...fields){

        for (let i = 0; i < fields.length; i++) {
           
            document.querySelector(`#${fields[i]}`).addEventListener("focus",()=>{
                document.querySelector("#update-button").removeAttribute("disabled");  
            });  
            
        }       

    }

}

const profile = new Profile();
profile.getUserAdmin();
profile.update();
profile.enableButton("user", "password", "email");