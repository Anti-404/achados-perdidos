import ModelCategories from '../../../../../models/categories/index.js';
import modelThings from '../../../../../models/things/index.js';

class IntThing{    

    constructor(){        
        this.modelCategories = new  ModelCategories();
        this.modelThings = new  modelThings();
        this.identifier = this.retrieveIdBbyUrl();                        
    }

    retrieveIdBbyUrl(){
        let url = (window.location.href).split("/");        
        url = url[url.length-1];
        let identifier = url.split("=")[1]; 
    
        return identifier;    
    }

    async getThing(){  
        
        const thing = await this.modelThings.get(this.identifier); 
        
        if(!thing.erro){            
            document.querySelector("#image-address").value = thing.result.image_address;

            document.querySelector("#local").value = thing.result.local;

            await this.selectCategories(thing.result.category_id);

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
        
        const thing = await this.modelThings.get(this.identifier); 

        document.querySelector("#update-button").addEventListener("click",(e)=>{  
            e.preventDefault();

            let id = this.identifier;
            let imageAddress = document.querySelector("#image-address").value;
            let local = document.querySelector("#local").value;
            
            let categoryId = document.querySelector("#list-categories").value;

            let description = document.querySelector("#description").value;
            
            let returnedStatus = (document.querySelector("#returned-status").checked)?1:0;
            let reservedStatus = (document.querySelector("#reserved-status").checked)?1:0;
                      
            let addressRedirecting = "http://localhost/smd/projeto/src/views/admin/things/";
            this.modelThings.update( addressRedirecting, {id:id, image_address:imageAddress, 
                                     local:local, category_id:categoryId, description:description, 
                                     returned_status:returnedStatus, reserved_status:reservedStatus}); 
        });


    }

    delete(){
        let addressRedirecting = "http://localhost/smd/projeto/src/views/admin/things/";

        document.querySelector("#delete-button").addEventListener("click",(e)=>{  
            e.preventDefault();

            this.modelThings.delete(addressRedirecting, this.identifier); 
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

const cadThings = new IntThing();
cadThings.getThing();
cadThings.update();
cadThings.delete();
cadThings.enableButton("local", "list-categories", "description", "returned-status", "reserved-status");