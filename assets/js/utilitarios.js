window.onload = ()=>{

    class Utilitarios{
        constructor(){}
        
        // evitar que quem nao estar logado consiga ver a area de adm
        verificarLogadoProtecao(){
            
            if(document.querySelector(".restritoAdm")){
                if(!localStorage.getItem("hash")){
                    window.location.href = "http://localhost/smd/projeto/";
                }else{
                    document.querySelector(".corpo").setAttribute("style","display:block");
                }
            }           
        }
 


    }

    const utilitario = new Utilitarios();
    utilitario.verificarLogadoProtecao();    
    
}