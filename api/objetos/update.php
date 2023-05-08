<?php
require('../config.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'put') {

    parse_str(file_get_contents('php://input'), $input);

    $id = $input['id'] ?? null;
    $nome = $input['nome'] ?? null;
    $descricao = $input['descricao'] ?? null;
    $local = $input['local'] ?? null;    
    $status_retirada = $input['status_retirada'] ?? null;
    $status_reservado = $input['status_reservado'] ?? null;    
    $id_categoria = $input['id_categoria'] ?? null;
   
    if($id && $id_categoria) {
        
        $sql = $pdo->prepare("SELECT * FROM objetos WHERE id = :id");
        $sql->bindValue(':id', $id);
        $sql->execute();
        

        if($sql->rowCount() > 0) {
            
            $sql = $pdo->prepare("UPDATE objetos SET nome = :nome, descricao = :descricao, local = :local,  status_retirada = :status_retirada , status_reservado = :status_reservado, id_categoria = :id_categoria WHERE id = :id");
            
            $sql->bindValue(':id', $id);
            $sql->bindValue(':nome', $nome);
            $sql->bindValue(':descricao', $descricao);
            $sql->bindValue(':local', $local);             
            $sql->bindValue(':status_reservado', $status_reservado);       
            $sql->bindValue(':status_retirada', $status_retirada);       
            $sql->bindValue(':id_categoria', $id_categoria);              
            $sql->execute();

            $array['result'] = [
                'nome' => $nome,
                'descricao' => $descricao,
                'local' => $local,                
                'status_reservado' => $status_reservado,
                'status_retirada' => $status_retirada,
                'id_categoria' => $id_categoria
            ];

        } else {
            $array['error'] = 'ID inexistente';
        }

    } else {
        //$array['error'] = 'Dados não enviados';
        $array['error'] = "{$id} {$status_reservado} {$status_retirada}  {$id_categoria}" ;
    }

} else {
    $array['error'] = 'Método não permitido (apenas PUT)';
}

require('../return.php');