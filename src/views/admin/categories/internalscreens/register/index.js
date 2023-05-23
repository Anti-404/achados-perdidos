import ModelCategories from '../../../../../models/categories/index.js';
import Controller from '../../../../../core/controller/index.js';

class CategoriesRegistration extends Controller{

    constructor(){        
        super();
        this.modelCategories = new  ModelCategories();
        this.prevPage = this.getPrevPageURL();        
    }
    save(){        
        document.querySelector("#save-button").addEventListener("click", (e)=>{ 
            e.preventDefault();
            let form = document.querySelector('form');
            let formData = new FormData(form);
                         
            this.modelCategories.insert(this.prevPage, formData);           
        
       });
    }

    handlerPageBack(){                
        document.querySelector("#back").addEventListener('click', ()=>{
            window.history.back();
        });
    }

    getPrevPageURL(){
        let url = this.retrieveURLCurrentPage();
        let prevPage = '';
 
        
        if(url.indexOf('prevPage=') != '-1'){

            let urlBreak = url.split('prevPage=');            
            prevPage = urlBreak[1];
            
            if(urlBreak.length >= 3){                
              prevPage = `${urlBreak[1]}prevPage=${urlBreak[2]}`;  
           }
        }
        
        console.log(prevPage)
        
        return prevPage;
    }

}

const categoriesRegistration = new CategoriesRegistration();
categoriesRegistration.save();
categoriesRegistration.handlerPageBack();