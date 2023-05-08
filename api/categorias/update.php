<?php
require('../config.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'put') {

    parse_str(file_get_contents('php://input'), $input);

    $id = $input['id'] ?? null;
    $nome = $input['nome'] ?? null;
    

    $id = filter_var($id);      

    if($id && $nome) {

        $sql = $pdo->prepare("SELECT * FROM categorias WHERE id = :id");
        $sql->bindValue(':id', $id);
        $sql->execute();

        if($sql->rowCount() > 0) {

            $sql = $pdo->prepare("UPDATE categorias SET nome = :nome WHERE id = :id");
            $sql->bindValue(':id', $id);
            $sql->bindValue(':nome', $nome);            
            $sql->execute();

            $array['result'] = [
                'id' => $id,
                'nome' => $nome
            ];

        } else {
            $array['error'] = 'ID inexistente';
        }

    } else {
        $array['error'] = 'Dados não enviados';
    }

} else {
    $array['error'] = 'Método não permitido (apenas PUT)';
}

require('../return.php');