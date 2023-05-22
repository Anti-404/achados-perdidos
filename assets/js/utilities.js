window.onload = ()=>{

    class Utilities{
        constructor(){}
               
        checkRegistered(){
            
            if(document.querySelector(".restricted-admin")){
                if(!localStorage.getItem("hash")){
                    window.location.href = "http://localhost/smd/projeto/";
                }else{
                    document.querySelector(".body").setAttribute("style","display:block");
                }
            }           
        }

        baseURL(){
            let containerHeader = document.querySelector("head");
            let base = document.createElement("base");
            base.setAttribute("href","http://localhost/smd/projeto/");
            containerHeader.appendChild(base);
       } 


    }

    const utilities = new Utilities();    
    utilities.checkRegistered();    
    utilities.baseURL();    
    
}