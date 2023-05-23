                import ModelCategories from '../../../../../models/categories/index.js';
import ModelThings from '../../../../../models/things/index.js';
import Controller from '../../../../../core/controller/index.js';

class ThingRegistration extends Controller{

    constructor(){
        super(); 
        this.select = document.querySelector("#category-id");
        this.modelCategories = new  ModelCategories();
        this.modelThings = new  ModelThings();
        this.prevPage = this.getPrevPageURL();       
        this.currentPage = this.retrieveURLCurrentPage();
        
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
            localStorage.setItem("redirProdReg", this.currentPage); 
            
            
            localStorage.setItem("imageAddress", document.getElementById("image-address").value); 
            localStorage.setItem("local", document.getElementById("local").value); 
            localStorage.setItem("description", document.getElementById("description").value); 
            window.location.href = `http://localhost/smd/projeto/src/views/admin/categories/internalscreens/register/?prevPage=${this.currentPage}`;            
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
            
            let formData = new FormData(document.querySelector('form'));                        
                                 
           this.modelThings.insert(this.prevPage, formData);       
            
        
       });
    }

    handlerPageBack(){                
        document.querySelector("#back").addEventListener('click', ()=>{
            window.history.back();
        });
    }
    
    
}

const thingRegistration = new ThingRegistration();
thingRegistration.selectCategories();
thingRegistration.goToCategoryRegistration();
thingRegistration.save();
thingRegistration.clearRedirProdRegLocalStorage();
thingRegistration.putDataBackForms();
thingRegistration.handlerPageBack();