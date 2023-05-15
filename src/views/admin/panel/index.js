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

        let ul = document.querySelector("#reserved ul");

        if(!allThings.error){ 
                        
            for (let i = 0; i < allThings.result.length; ++i) {
                let li = document.createElement("li");
                let img = document.createElement("img");
                let span = document.createElement("span");                
                let returnButton = document.createElement("button")
  
                li.setAttribute("id",allThings.result[i].id);                    
                img.setAttribute("src","http://localhost/smd/projeto/api/"+(allThings.result[i].image_address).substring(3,(allThings.result[i].image_address).length));                    
                img.setAttribute("alt",allThings.result[i].description);
                span.appendChild(document.createTextNode(allThings.result[i].description));
                returnButton.appendChild(document.createTextNode("OK"));                                                                            
                
                li.appendChild(img);
                li.appendChild(span);
                li.appendChild(returnButton);
                ul.appendChild(li);
                
            }

            
        } 
        
    }
    

}

const panel = new Panel();
panel.exit();
panel.ListThingsReserved();
