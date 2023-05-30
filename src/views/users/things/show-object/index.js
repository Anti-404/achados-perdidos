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
        const category = await this.modelCategories.get(thing.result[0].category_id);         
        
        if(!thing.erro && !category.erro){            
            document.querySelector("#data-id").value = this.identifier;            
            document.querySelector("#code").appendChild(document.createTextNode(this.identifier));            
            
            document.querySelector("form img").setAttribute('src', `${thing.result[0].image_address}`);            

            document.querySelector("#image-address").value = thing.result[0].image_address;                        

            document.querySelector("#category").innerHTML = category.result.name;

            document.querySelector("#category-id").value = thing.result[0].category_id;                        
            
            document.querySelector("#local").value = thing.result[0].local;

            document.querySelector("#description").value = thing.result[0].description;
            
            document.querySelector("#returned-status").value = thing.result[0].returned_status;
            
            //document.querySelector("#reserved-status").value = thing.result[0].reserved_status;
            
            document.querySelector("#date").value = thing.result[0].date;
            
            let message = `Codigo: ${this.identifier} Local: ${thing.result[0].local} Descrição: ${thing.result[0].description}  
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
        
        document.querySelector("#its-my-button").addEventListener("click",(e)=>{    
            e.preventDefault();            
                      
           //let FormData = new FormData(document.querySelector('.container form')); 
           //FormData.set('reserved_status',1);           
           //console.log([...reserveFormData.entries()])

           document.querySelector('#modal').style.display = 'block';
           document.querySelector('#first-form').style.display = 'none';
           //window.scrollTo(document.body.clientWidth, document.body.clientHeight);
           

        });
    } 

    sendEmail(){        
        document.querySelector("#send-email-button").addEventListener("click",async (e)=>{    
            e.preventDefault();            
                      
           let formData = new FormData(document.querySelector('#first-form'));
           formData.set('reserved_status',1); 
           
            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));
            
            }
           let response = await this.modelThings.sendEmail(formData);           
           
           let formEmail = document.querySelector("#modal form");           
           if(!formEmail.to.value){
             alert('Insira o email');            
             formEmail.to.focus();
             return; 
            }
           if(!response.erro){
                let prevPage = 'http://localhost/smd/projeto';           
                let message = 'Um QR code foi gerado e enviado para o seu email, por favor mostrar quando for á secretaria buscar o seu objeto';                
                this.modelThings.update(prevPage, formData, message);                            
           }
           
                      

        });

    }
    
    hiddenModal(){
        document.querySelector('#modal').style.display = 'none';        
    }
}

const showThing = new ShowThing();
await showThing.getThing();
showThing.handlerPageBack(); 
showThing.itsMy(); 
showThing.hiddenModal(); 
showThing.sendEmail(); 


