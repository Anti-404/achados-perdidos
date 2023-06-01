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
        this.takePictureBlob = "empty";
        
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
            window.location.href = `src/views/admin/categories/internalscreens/register/?prevPage=${this.currentPage}`;            
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

            if ( !(typeof this.takePictureBlob === 'string')) {                
                formData.set('image_address', this.takePictureBlob);
            }
            
            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));
                
            }                              
                                 
           this.modelThings.insert(this.prevPage, formData);       
            
        
       });
    }

    handlerPageBack(){                
        document.querySelector("#back").addEventListener('click', ()=>{
            window.history.back();
        });
    }

    takePicture(){

        let video = document.querySelector('.take-picture video');

        navigator.mediaDevices.getUserMedia({video:{width: 320}})
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(error => {
            console.log(error);
        })

        document.querySelector('canvas').style.display = 'none';
        
        if(!document.querySelector("#take-picture-again-button").style.display){
            document.querySelector("#take-picture-again-button").style.display = "none";
        } 

        document.querySelector('#take-picture-button').addEventListener('click', async () => {

            let canvas = document.querySelector('canvas');            
            
            canvas.height = video.videoHeight;            
            canvas.width = video.videoWidth;
            
            let context = canvas.getContext('2d');
            context.drawImage(video, 0, 0);                        
            
            let img = document.querySelector('#img-picture');
            img.src = canvas.toDataURL('image/png');            
            let takePicture = document.querySelector('.take-picture');
            takePicture.style.display = 'none';            

            try {            
                const response = await fetch(img.src);                           
                let blob = await response.blob();
                
                console.log(blob);
                this.takePictureBlob = blob;

                            
              } catch(e) {
                console.log(e);
              } 

              document.querySelector("#take-picture-again-button").style.marginTop = "13px";  
              document.querySelector("#take-picture-again-button").style.display = "block";  
              
            
        });       

    }

    insertElementDOMAfter(newElement, reference) {
        reference.parentNode.insertBefore(newElement, reference.nextSibling);
    }
    
    takePictureAgainButton(){
        document.querySelector('#take-picture-again-button').addEventListener('click',()=>{
            location.reload(true);
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
thingRegistration.takePicture();
thingRegistration.takePictureAgainButton();