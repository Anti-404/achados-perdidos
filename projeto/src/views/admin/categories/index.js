import ModelCategories from '../../../models/categories/index.js';

class Categories{
    constructor(){        
        this.modelCategories = new  ModelCategories();
    } 
    
    async showAll(){    
        let tableBody = document.querySelector("tbody");
        
        const allCategories = await this.modelCategories.getAll();
        
        if(!allCategories.error){  
                      
            for (let i = 0; i < allCategories.result.length; ++i) {
                let tr = document.createElement("tr");                
                let td1 = document.createElement("td"); 
                let td2 = document.createElement("td"); 
                
                td1.setAttribute("data",allCategories.result[i].id); 
                td2.setAttribute("data",allCategories.result[i].id);
                

                tr.appendChild(td1);
                tr.appendChild(td2);
                td1.appendChild(document.createTextNode(allCategories.result[i].id));
                td2.appendChild(document.createTextNode(allCategories.result[i].name));

                tableBody.appendChild(tr);
                
            }

            
        }       

    }

    goToCategoryRegister(){
        document.querySelector("#register-categories-button").addEventListener("click",()=>{  

            window.location.href = "http://localhost/smd/projeto/src/views/admin/categories/internalscreens/register/";
        });
        
    }

    goToInteraction(){  
        const tds =  document.querySelectorAll("tbody");
        for (let i = 0; i < tds.length; i++) {

            tds[i].addEventListener("click", (e)=>{            
                let id = e.target.getAttribute("data")     
                
                window.location.href = `http://localhost/smd/projeto/src/views/admin/categorias/internalscreens/interaction/?id=${id}`;
                
            });            
        }       

        
       
    }

}

const categories = new Categories();
categories.goToCategoryRegister();
categories.showAll();
categories.goToInteraction();