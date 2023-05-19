import ModelCategories from './src/models/categories/index.js';
import ModelThings from './src/models/things/index.js';

class Home {
    constructor(){
        this.modelCategories = new ModelCategories();               
        this.modelThings = new ModelThings();               
    }

    async categoriesList(){         
        let ul = document.querySelector("#categories-list");
        const allCategories = await this.modelCategories.getAll();
        
        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) {  
                let li = document.createElement("li"); 
                let a = document.createElement("a");                
                a.setAttribute("data-id",allCategories.result[i].id);                                
                a.appendChild(document.createTextNode((allCategories.result[i].name)));
                li.appendChild(a);
                ul.appendChild(li);                 
            }           
            
       }    
       
       const a =  document.querySelectorAll("ul li a");

        for (let i = 0; i < a.length; i++) {

            a[i].addEventListener("click", async (e)=>{            
                let categoriesId = e.target.getAttribute("data-id")     
                let allThings;
                if(categoriesId == "0"){
                    allThings = await this.modelThings.getAll();
                }else{
                    allThings = await this.modelThings.getThingsByCategoryId(categoriesId);  
                }

                let thingsList = document.querySelector(".things-list");              

                thingsList.innerHTML = "";
                               
                if(!allThings.error){ 
                    
                    for (let i = 0; i < allThings.result.length; ++i) {
                        let a = document.createElement("a");
                        let figure = document.createElement("figure");
                        let img = document.createElement("img");
                        let figCaption = document.createElement("figcaption");             
                                                                      
                        a.setAttribute("data-id",allThings.result[i].id);                                                            
                        img.setAttribute("src","http://localhost/smd/projeto/api/"+(allThings.result[i].image_address).substring(3,(allThings.result[i].image_address).length));                        
                        img.setAttribute("alt",allThings.result[i].description);                                                        
                        figCaption.appendChild(document.createTextNode(allThings.result[i].description));
                         
                        figure.appendChild(img);
                        figure.appendChild(figCaption);
                        a.appendChild(figure);
                        thingsList.appendChild(a);
                        
                    }  
        
                    
                } 
                
            });            
        }
               
                
            
    }   
        
    async thingsList(){

            const allThings = await this.modelThings.getAll();            
            let  thingsList = document.querySelector(".things-list");

            if(!allThings.error){ 
                
                for (let i = 0; i < allThings.result.length; ++i) {
                    let a  = document.createElement("a");
                    let figure = document.createElement("figure");
                    let img = document.createElement("img");
                    let figCaption = document.createElement("figcaption");             
                    
                    a.setAttribute("href",`./src/views/users/things/show-object/?id=${allThings.result[i].id}`);
                    figure.setAttribute("data-id",allThings.result[i].id);                        
                    img.setAttribute("src","http://localhost/smd/projeto/api/"+(allThings.result[i].image_address).substring(3,(allThings.result[i].image_address).length));                        
                    img.setAttribute("alt",allThings.result[i].description);                                                        
                    figCaption.appendChild(document.createTextNode(allThings.result[i].description));
                     
                    figure.appendChild(img);
                    figure.appendChild(figCaption); 
                    a.appendChild(figure);
                    thingsList.appendChild(a);
                    
                }
    
                
            } 

    }
    
    goToThing(){
        //let figuresThing = document.querySelectorAll("figure");
        const array = document.getElementsByTagName("figure");        
        //console.log(document.getElementsByTagName("figure").length);
        console.log(array);

        //for (let i = 0; i < figuresThing.length; i++) {
            
            //let idThing = figuresThing[i].getAttribute("data-id");            
            //figuresThing[i].addEventListener("click",(e)=>{                            
              
                //window.location.href = `http://localhost/smd/projeto/src/views/users/things/show-object/${idThing}`;           
                
            //});    
       // }        
        
    }
       

}

const home = new Home();
home.categoriesList();
home.thingsList();

