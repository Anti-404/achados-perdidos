export default class ModelAdms{
        
        constructor() {
           this.path = "http://localhost/smd/projeto/api/";  
        }        
        
        logar(usuario, senha){
          
          const endpoint = this.path+"adms/logar.php";
          
          let dados = {
            usuario: usuario,
            senha: senha                
          }
            
            jQuery.ajax({
              
              type:'POST',
              url:endpoint,
              data:dados,
              success:function(resposta){

                if(!resposta.error){                  
                  //sessionStorage.setItem("hash", resposta.result.hash);// // nao vou adicionar pq o alan que ficar logado direto
                  localStorage.setItem("hash", resposta.result.hash);
                  window.location.href = "http://localhost/smd/projeto/src/telas/adm/painel/";
                }else{
                    alert(resposta.error);
                }
                
              }
              
            });
            
         
        }      
        
    }
    
