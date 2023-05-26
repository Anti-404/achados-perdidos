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
            document.querySelector("#code").appendChild(document.createTextNode(this.identifier));            
            
            document.querySelector("form img").setAttribute('src', `${thing.result.image_address}`);            

            document.querySelector("#image-address").value = thing.result.image_address;                        

            document.querySelector("#category").innerHTML = category.result.name;

            document.querySelector("#category-id").value = thing.result.category_id;                        
            
            document.querySelector("#local").value = thing.result.local;

            document.querySelector("#description").value = thing.result.description;
            
            document.querySelector("#returned-status").value = thing.result.returned_status;
            
            document.querySelector("#reserved-status").value = thing.result.reserved_status;
            let message = `Codigo: ${this.identifier} Local: ${thing.result.local} Descrição: ${thing.result.description}  
            `;
            document.querySelector("#modal #body").value=  message;
            
            

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
        let reserveFormData = []

        document.querySelector("#its-my-button").addEventListener("click",(e)=>{    
            e.preventDefault();            
                      
           reserveFormData = new FormData(document.querySelector('.container form')); 
           reserveFormData.set('reserved_status',1);           
           console.log([...reserveFormData.entries()])

        });

        document.querySelector("#send-email-button").addEventListener("click",async (e)=>{    
            e.preventDefault();            
                      
           let formData = new FormData(document.querySelector('#modal form'));
           let response = await this.modelThings.sendEmail(formData);           
           
           if(!response.erro && reserveFormData){
                let prevPage = 'http://localhost/smd/projeto';           
                let message = 'Um QR code foi gerado e enviado para o seu email! Por favor, mostrar quando for á secretaria buscar o seu objeto!';                
                this.modelThings.update(prevPage, reserveFormData, message);                            
           }
                      

        });
    } 
}

const showThing = new ShowThing();
await showThing.getThing();
showThing.handlerPageBack(); 
showThing.itsMy(); 


