import ModelThings from '../../../models/things/index.js';
import ModelCategories from '../../../models/categories/index.js';
import Controller from '../../../core/controller/index.js';

class Things extends Controller{

    constructor(){    
        super();
        this.modelThings = new  ModelThings();
        this.modelCategories = new  ModelCategories();
        this.tableBody = document.querySelector("tbody"); 
        this.currentPage = this.retrieveURLCurrentPage();       
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
                let span = document.createElement("span");             
                let p = document.createElement("p");             
                

                p.appendChild(document.createTextNode("Código: "+allThings.result[i].id)); 
                a.setAttribute("href",`./src/views/admin/things/internalscreens/interaction?id=${allThings.result[i].id}&&prevPage=${this.currentPage}`);
                figure.setAttribute("data-id",allThings.result[i].id);                        
                img.setAttribute("src",allThings.result[i].image_address);                        
                img.setAttribute("alt",allThings.result[i].description);  
                
                document.querySelectorAll('#categories-list option').forEach((item)=>{
                                    
                    if(allThings.result[i].category_id == item.getAttribute('value')){
                        span.appendChild(document.createTextNode(item.innerHTML));                  
                        return;
                    }
                });                                                                                         
                figCaption.appendChild(document.createTextNode(allThings.result[i].description));
                 
                figure.appendChild(img);
                figure.appendChild(figCaption);                     
                a.appendChild(p);
                a.appendChild(span);
                a.appendChild(figure);
                
                thingsList.appendChild(a);
                
            }

            
        }

    }
        
    goToRegisterthing(){
        document.querySelector("#register-things-button").addEventListener("click",(e)=>{            
            e.preventDefault();              
            window.location.href = `src/views/admin/things/internalscreens/register/?prevPage=${this.currentPage}`;           
            
        });
        
    }

    
    async categoriesList(){         
        let select = document.querySelector("#categories-list");
        const allCategories = await this.modelCategories.getAll();
        
        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) {                  
                let option = document.createElement("option");                                                              
                option.setAttribute("value",allCategories.result[i].id);
                option.appendChild(document.createTextNode((allCategories.result[i].name)));                                 
                select.appendChild(option);                 
            }           
            
       }           
             

        select.addEventListener("change", async (e)=>{      
            
            let categoriesId = e.target.value;
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
                    let a  = document.createElement("a");
                    let figure = document.createElement("figure");
                    let img = document.createElement("img");
                    let figCaption = document.createElement("figcaption");             
                    let span = document.createElement("span");             
                    let p = document.createElement("p");             
                    
    
                    p.appendChild(document.createTextNode("Código: "+allThings.result[i].id)); 
                    a.setAttribute("href",`./src/views/admin/things/internalscreens/interaction?id=${allThings.result[i].id}`);
                    figure.setAttribute("data-id",allThings.result[i].id);                        
                    img.setAttribute("src",allThings.result[i].image_address);                        
                    img.setAttribute("alt",allThings.result[i].description);  
                    document.querySelectorAll('#categories-list option').forEach((item)=>{
                                        
                        if(allThings.result[i].category_id == item.getAttribute('value')){
                            span.appendChild(document.createTextNode(item.innerHTML));                  
                            return;
                        }
                    });                                                                                         
                    figCaption.appendChild(document.createTextNode(allThings.result[i].description));
                     
                    figure.appendChild(img);
                    figure.appendChild(figCaption);                     
                    a.appendChild(p);
                    a.appendChild(span);
                    a.appendChild(figure);
                    
                    thingsList.appendChild(a);
                    
                }
    
                
            }    
            
        });            
       
               
                
            


    }  
    
    searchItem(){       
        document.querySelector('.search-bar input[type="text"]').addEventListener('keyup',()=>{
            let input = document.querySelector('#search-item').value
            input=input.toLowerCase();
            let x = document.querySelectorAll('.things-list a');
            
            
            for (let i = 0; i < x.length; i++) { 
                 if (!x[i].outerText.toLowerCase().includes(input)) {
                    x[i].style.display="none";
                }
                else {
                    x[i].style.display="block";                 
                }
            }
            
        });
    }


}

const things = new Things();

things.categoriesList();
await things.thingsList(); // 1: "await" VERY IMPORTANT: explanation below.*
things.goToRegisterthing();
things.searchItem();

/*
1: As this method is asynchronous, it passes to the bottom method before creating the elements, so the bottom method cannot access them. So you need to put the "await"
*/
