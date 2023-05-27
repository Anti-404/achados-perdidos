import ModelThing from '../../../../../models/things/index.js';
import Controller from '../../../../../core/controller/index.js';

class Discard extends Controller{
    constructor(){              
        super();       
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
                img.setAttribute("src",allThingsDiscard.result[i].image_address);                        
                img.setAttribute("alt",allThingsDiscard.result[i].description);                                                        
                figCaption.appendChild(document.createTextNode(allThingsDiscard.result[i].description));
                 
                figure.appendChild(img);
                figure.appendChild(figCaption);
                a.appendChild(figure);
                thingsDiscardContainer.appendChild(a);
                
            }

            
        } 

    }
 
    handlerPageBack(){                
        document.querySelector("#back").addEventListener('click', ()=>{
            window.history.back();
        });
    }

}   

const discard = new Discard();
discard.allThingsDiscard();
discard.handlerPageBack();