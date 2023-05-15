import ModelCategories from '../../../../../models/categories/index.js';
import ModelThings from '../../../../../models/things/index.js';

class ThingRegistration{

    constructor(){
        this.select = document.querySelector("#category-id");
        this.modelCategories = new  ModelCategories();
        this.modelThings = new  ModelThings();
    }

    clearRedirProdRegLocalStorage(){        
        localStorage.setItem("redirProdReg","");
    }

    async selectCategories(){         
        
        const allCategories = await this.modelCategories.getAll();

        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) {  
                let option = document.createElement("option"); 
                option.setAttribute("value",allCategories.result[i].id);              
                option.appendChild(document.createTextNode(allCategories.result[i].name));
                this.select.appendChild(option);                 
            }           
            
       }
       
              

    }

    goToCategoryRegistration(){
        document.querySelector("#register-categories-button").addEventListener("click",(e)=>{            
            e.preventDefault();
            let redirectToThing = "http://localhost/smd/projeto/src/views/admin/things/internalscreens/register/";
            localStorage.setItem("redirProdReg", redirectToThing); 
            
            
            localStorage.setItem("imageAddress", document.getElementById("image-address").value); 
            localStorage.setItem("local", document.getElementById("local").value); 
            localStorage.setItem("description", document.getElementById("description").value); 

            window.location.href = "http://localhost/smd/projeto/src/views/admin/categories/internalscreens/register/";            
        });
        
        
    }

    putDataBackForms(){        
        
         if(localStorage.getItem("imageAddress") || localStorage.getItem("local") || localStorage.getItem("description")){
            document.getElementById("image-address").value = localStorage.getItem("imageAddress") && '';
            document.getElementById("local").value = localStorage.getItem("local")  && ''; 
            document.getElementById("description").value  = localStorage.getItem("description")  && '';

            localStorage.removeItem("imageAddress");
            localStorage.removeItem("local");
            localStorage.removeItem("description");

         }        

        
    }

    save(){        
        document.querySelector("#save-button").addEventListener("click", (e)=>{             
            e.preventDefault();          

            let formData = new FormData(document.querySelector("#thing-form"));            
            let redirectToThing = "http://localhost/smd/projeto/src/views/admin/things/";            
                                 
           this.modelThings.insert(redirectToThing, formData);       
            
        
       });
    }
    
    
}

const thingRegistration = new ThingRegistration();
thingRegistration.selectCategories();
thingRegistration.goToCategoryRegistration();
thingRegistration.save();
thingRegistration.clearRedirProdRegLocalStorage();
thingRegistration.putDataBackForms();