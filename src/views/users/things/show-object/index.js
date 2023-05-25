import ModelCategories from '../../../../models/categories/index.js';
import ModelThings from '../../../../models/things/index.js';
import Controller from '../../../../core/controller/index.js';

class ShowThing extends Controller{    

    constructor(){  
        super()      ;
        this.modelCategories = new  ModelCategories();
        this.modelThings = new  ModelThings();
        this.identifier = this.retrieveURLId();                     

    }   

    async getThing(){            
        
        const thing = await this.modelThings.get(this.identifier);         
        const category = await this.modelCategories.get(thing.result.category_id);         
        
        if(!thing.erro && !category.erro){            
            document.querySelector("#data-id").value = this.identifier;            
            
            document.querySelector("form img").setAttribute('src', `${thing.result.image_address}`);            

            document.querySelector("#image-address").value = thing.result.image_address;                        

            document.querySelector("#category").innerHTML = category.result.name;

            document.querySelector("#category-id").value = thing.result.category_id;                        
            
            document.querySelector("#local").value = thing.result.local;

            document.querySelector("#description").value = thing.result.description;
            
            document.querySelector("#returned-status").value = thing.result.returned_status;
            
            document.querySelector("#reserved-status").value = thing.result.reserved_status;
            
            

        }else{
            alert(thing.erro);
        }        
        
    }
    
    

    handlerPageBack(){
        document.querySelector("#back").addEventListener('click',()=>{
            window.history.back();
        });

    }

    itsMy(){                                                                                                                         
        document.querySelector("#its-my").addEventListener("click",(e)=>{    
            e.preventDefault();            
           
           
           let formData = new FormData(document.querySelector('form')); 
           formData.set('reserved_status',1);           
           let prevPage = 'http://localhost/smd/projeto';           
           let message = 'Reservado';
           this.modelThings.update( prevPage, formData, message);        
    

        });
    } 
}

const showThing = new ShowThing();
await showThing.getThing();
showThing.handlerPageBack(); 
showThing.itsMy(); 


