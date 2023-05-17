import ModelThings from "../../../models/things/index.js";
class Panel{
    constructor(){
        this.modelThings = new ModelThings();
    } 

    exit(){
        document.querySelector("#exit-button").addEventListener("click",()=>{
            localStorage.removeItem("hash");
            alert("Deslogado com sucesso");
            window.location.href = "http://localhost/smd/projeto/";
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
  
                figure.setAttribute("id",allThings.result[i].id);                    
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

}

const panel = new Panel();
panel.exit();
panel.ListThingsReserved();
panel.toggleSandwichMenu();
