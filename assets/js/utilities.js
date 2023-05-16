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
 


    }

    const utilities = new Utilities();
    utilities.checkRegistered();    
    
}