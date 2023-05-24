import ModelCategories from '../../../../../models/categories/index.js';
import ModelThings from '../../../../../models/things/index.js';
import Controller from '../../../../../core/controller/index.js';

class ThingsInteraction extends Controller{    

    constructor(){  
        super()      ;
        this.modelCategories = new  ModelCategories();
        this.modelThings = new  ModelThings();
        this.identifier = this.retrieveURLId();
        this.prevPage = this.getPrevPageURL();
        this.currentPage = this.retrieveURLCurrentPage();        

    }   

    async getThing(){  
        
        const thing = await this.modelThings.get(this.identifier); 
        
        if(!thing.erro){            
            document.querySelector("#data-id").value = this.identifier;            
            
            document.querySelector("form img").setAttribute('src', `${thing.result.image_address}`);            

            document.querySelector("#image-address").value = thing.result.image_address;

            await this.selectCategories(thing.result.category_id);            
            
            document.querySelector("#local").value = thing.result.local;

            document.querySelector("#description").value = thing.result.description;
            
            if(Number.parseInt(thing.result.returned_status)){
                document.querySelector("#returned-status").setAttribute("checked","true");
            }

            if(Number.parseInt(thing.result.reserved_status)){
                document.querySelector("#reserved-status").setAttribute("checked","true");
            }          
                       

        }else{
            alert(thing.erro);
        }        
    }

    async selectCategories(categoryId){   
        
        const listCategories = document.querySelector("#list-categories");
        const allCategories = await this.modelCategories.getAll();

        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) {  
                let option = document.createElement("option"); 
                option.setAttribute("value",allCategories.result[i].id);              
                option.appendChild(document.createTextNode(allCategories.result[i].name));
                listCategories.appendChild(option);                 
            }           
            
       } 
        
               
        let category = await this.modelCategories.get(categoryId);   

        if(!category.erro){
            const options = document.querySelector("#list-categories").options;
            for (let i = 0; i < options.length; i++) {
                if(options[i].value == category.result.id){
                    options[i].selected = true;
                }                
            }
        }else{
            alert(category.erro);
        }        

        
    } 
    
    async update(){

        document.querySelector("#update-button").addEventListener("click",(e)=>{  
            e.preventDefault();

            let formData = new FormData(document.querySelector('form'));                        
            this.modelThings.update( this.prevPage, formData); 
        });


    }

    delete(){
        

        document.querySelector("#delete-button").addEventListener("click",(e)=>{  
            e.preventDefault();            
            this.modelThings.delete(this.prevPage, this.identifier); 
        });
    }

    enableButton(...fields){

        for (let i = 0; i < fields.length; i++) {
           
            document.querySelector(`#${fields[i]}`).addEventListener("focus",()=>{
                document.querySelector("#update-button").removeAttribute("disabled");  
            });  
            
        }       

    }

    handlerPageBack(){
        document.querySelector("#back").addEventListener('click',()=>{
            window.history.back();
        });

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
}

const thingsInteraction = new ThingsInteraction();
thingsInteraction.getThing();
thingsInteraction.update();
thingsInteraction.delete();
thingsInteraction.enableButton("local", "list-categories", "description", "returned-status", "reserved-status");
thingsInteraction.handlerPageBack();
thingsInteraction.goToCategoryRegistration();