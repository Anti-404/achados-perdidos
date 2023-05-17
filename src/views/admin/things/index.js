import ModelThings from '../../../models/things/index.js';
import ModelCategories from '../../../models/categories/index.js';

class Things{

    constructor(){        
        this.modelThings = new  ModelThings();
        this.modelCategories = new  ModelCategories();
        this.tableBody = document.querySelector("tbody");
    }

    async showAll(){        
        
        const allThings = await this.modelThings.getAll();
        
        if(!allThings.error){  
                      
            for (let i = 0; i < allThings.result.length; ++i) {
                let tr = document.createElement("tr");
                const tds = [];

                let count = 0;
                for (let prop in allThings.result[i]) {                    
                    tds.push(document.createElement("td"));                                       
                    tds[count].setAttribute("data",allThings.result[i].id);
                    tds[count].appendChild(document.createTextNode(allThings.result[i][prop]));
                    tr.appendChild(tds[count]);
                    ++count;                    
                }                                  

                this.tableBody.appendChild(tr);
                
            }

            
        }       

    }

    goToInteraction(){  
        const tds =  document.querySelectorAll("tbody");
        for (let i = 0; i < tds.length; i++) {

            tds[i].addEventListener("click", (e)=>{            
                let id = e.target.getAttribute("data")     
                
                window.location.href = `src/views/admin/things/internalscreens/interaction/?id=${id}`;
                
            });            
        }       

        
       
    }

    goToRegisterthing(){
        document.querySelector("#register-things-button").addEventListener("click",(e)=>{            
            e.preventDefault();              
            window.location.href = "src/views/admin/things/internalscreens/register/";           
            
        });
        
    }

    async getCategories(){         
        
        let ul = document.querySelector("#categories-list");
        const allCategories = await this.modelCategories.getAll();

        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) {  
                let li = document.createElement("li"); 
                li.setAttribute("data-id",allCategories.result[i].id);              
                li.appendChild(document.createTextNode(allCategories.result[i].name));
                ul.appendChild(li);                 
            }           
            
       }
                            
       const lis =  document.querySelectorAll("ul li");

        for (let i = 0; i < lis.length; i++) {

            lis[i].addEventListener("click", async (e)=>{            
                let categoryId = e.target.getAttribute("data-id")     
                const allThings = await this.modelThings.getThingsByCategoryId(categoryId);
                               
                document.querySelector("tbody").innerHTML = "";
                
                if(!allThings.error){ 
                    
                    for (let i = 0; i < allThings.result.length; ++i) {
                        let tr = document.createElement("tr");
                        const tds = [];
        
                        let count = 0;
                        for (let prop in allThings.result[i]) {                    
                            tds.push(document.createElement("td"));                                       
                            tds[count].setAttribute("data",allThings.result[i].id);
                            tds[count].appendChild(document.createTextNode(allThings.result[i][prop]));
                            tr.appendChild(tds[count]);
                            ++count;                    
                        }                                  
        
                        this.tableBody.appendChild(tr);
                        
                    }
        
                    
                } 
                
            });            
        }
       

    }

}

const things = new Things();

things.showAll();
things.goToInteraction();
things.goToRegisterthing();
things.getCategories();

