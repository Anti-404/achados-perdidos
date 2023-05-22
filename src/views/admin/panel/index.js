import ModelThings from "../../../models/things/index.js";
import Controller from "../../../core/controller/index.js";

class Panel extends Controller{
    constructor(){
        super();
        this.modelThings = new ModelThings();        
        this.currentPage = this.retrieveURLCurrentPage();
    } 

    exit(){
        document.querySelector("#exit-button").addEventListener("click",()=>{
            localStorage.removeItem("hash");
            alert("Deslogado com sucesso");
            window.location.href = "http://localhost/smd/projeto/src/views/admin/login";
        });
        
    }

    async ListThingsReserved(){

        const allThings = await this.modelThings.getThingsReserved();                    
        let  thingsListReserved = document.querySelector(".reserved");        

        if(!allThings.error){ 
                        
            for (let i = 0; i < allThings.result.length; ++i) {
                                
                let figure = document.createElement("figure");
                let img = document.createElement("img");
                let figCaption = document.createElement("figcaption");  
                let returnButton = document.createElement("button");
  
                figure.setAttribute("data-id",allThings.result[i].id);                    
                img.setAttribute("src","api/"+(allThings.result[i].image_address).substring(3,(allThings.result[i].image_address).length));                    
                img.setAttribute("alt",allThings.result[i].description);
                figCaption.appendChild(document.createTextNode(allThings.result[i].description));
                returnButton.appendChild(document.createTextNode("OK"));                                                                            
                
                figure.appendChild(img);                
                figure.appendChild(figCaption);                
                figure.appendChild(returnButton);                
                thingsListReserved.appendChild(figure);
                
            }

            
        } 
        
    }
    
    toggleSandwichMenu(){
        
        document.getElementsByClassName("sandwich-menu-button")[0].addEventListener("click",(e)=>{
            let  sandwichMenu= document.querySelectorAll(".sandwich-menu div")[1];
            
            if(sandwichMenu.classList.toggle("visible")){ 
                sandwichMenu.setAttribute("style","display:block");
            }else{
                sandwichMenu.setAttribute("style","display:none");
            }
            
        });
               
    }

    goToProfile(){
        document.querySelector(".profile-button").addEventListener("click",()=>{  

           window.location.href = `src/views/admin/profile/`;

        });
        
    }

    goToDiscardeThings(){
        document.querySelector(".discard-things-button").addEventListener("click",()=>{  

           window.location.href = `src/views/admin/things/internalscreens/discard/`;

        });
        
    }

    goToReturnedThings(){
        document.querySelector(".returned-things-button").addEventListener("click",()=>{  

           window.location.href = `src/views/admin/things/internalscreens/returned/`;

        });
        
    }

    goToCategoryManager(){
        document.querySelector(".category-manager-button").addEventListener("click",()=>{  

           window.location.href = `src/views/admin/categories/`;

        });
        
    }

    goToThingRegister(){
        document.querySelector(".register-thing-button").addEventListener("click",()=>{  
            
           window.location.href = `src/views/admin/things/internalscreens/register/?prevPage=${this.currentPage}`;

        });
    
    }

    goToReturnedThing(){
        document.querySelector(".returned-thing-button").addEventListener("click",()=>{  

           //window.location.href = `src/views/admin/things/internalscreens/returned/`;
           alert("QR Code");

        });
        
    }

    goToManageThings(){
        document.querySelector(".manage-things-button").addEventListener("click",()=>{  

           window.location.href = `src/views/admin/things/`;

        });
        
    } 

    goToInteractionThing(){  
        
        let thingsList =  document.querySelectorAll(".reserved figure");       
        console.log(thingsList)
       
        thingsList.forEach((thing)=>{
            thing.addEventListener("click", (e)=>{   
                let id = thing.getAttribute("data-id")            
                window.location.href = `src/views/admin/things/internalscreens/interaction/?id=${id}`;
                    
            });    
        })
       
       
    }
    

}

const panel = new Panel();
await panel.ListThingsReserved();
panel.toggleSandwichMenu();
panel.goToProfile();
panel.goToDiscardeThings();
panel.goToReturnedThings();
panel.goToCategoryManager();
panel.goToThingRegister();
panel.goToReturnedThing();
panel.goToManageThings();
panel.goToInteractionThing();

panel.exit();