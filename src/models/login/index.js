import Model from '../index.js';

export default class ModelLogin extends Model{
    constructor() {
        super('adms');
     }

     logar(endRedirec, campos){          
        
        const endpoint = `${this.path}${this.tabela}/login`;       
        
        let dados = campos;
          
          jQuery.ajax({
            
            type:'POST',
            url:endpoint,
            data:dados,
            success:function(resposta){

              if(!resposta.error){                                  
                localStorage.setItem("hash", resposta.result.hash);
                window.location.href = endRedirec;
              }else{
                  alert(resposta.error);
              }
              
            }
            
          });
          
       
      }

}