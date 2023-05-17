import ModelThing from '../../../../../models/things/index.js';

class Discard {
    constructor(){                     
        this.modelThing = new ModelThing();               
    }

       
    async allThingsDiscard(){

        const allThingsDiscard = await this.modelThing.getThingsDiscard();            
        let  thingsDiscardContainer = document.querySelector(".things-descard-list");

        if(!allThingsDiscard.error){ 
            
            for (let i = 0; i < allThingsDiscard.result.length; ++i) {
                let a = document.createElement("a");
                let figure = document.createElement("figure");
                let img = document.createElement("img");
                let figCaption = document.createElement("figcaption");             
                                                              
                a.setAttribute("id",allThingsDiscard.result[i].id);                        
                img.setAttribute("src","http://localhost/smd/projeto/api/"+(allThingsDiscard.result[i].image_address).substring(3,(allThingsDiscard.result[i].image_address).length));                        
                img.setAttribute("alt",allThingsDiscard.result[i].description);                                                        
                figCaption.appendChild(document.createTextNode(allThingsDiscard.result[i].description));
                 
                figure.appendChild(img);
                figure.appendChild(figCaption);
                a.appendChild(figure);
                thingsDiscardContainer.appendChild(a);
                
            }

            
        } 

}
 

}   

const discard = new Discard();
discard.allThingsDiscard();