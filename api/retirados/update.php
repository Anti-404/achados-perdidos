<?php
require('../config.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'put') {

    parse_str(file_get_contents('php://input'), $input);

    $id = $input['id'] ?? null;
    $data = $input['data'] ?? null;
    $contato = $input['contato'] ?? null;
    $id_produto = $input['id_produto'] ?? null;

    $id = filter_var($id);
    $data = filter_var($data);
    $contato = filter_var($contato);
    $id_produto = filter_var($id_produto);

    if($id && $data && $contato && $id_produto) {

        $sql = $pdo->prepare("SELECT * FROM retirados WHERE id = :id");
        $sql->bindValue(':id', $id);
        $sql->execute();

        if($sql->rowCount() > 0) {

            $sql = $pdo->prepare("UPDATE retirados SET data = :data, contato = :contato, id_produto = :id_produto WHERE id = :id");  
            $sql->bindValue(':id', $id);          
            $sql->bindValue(':data', $data);
            $sql->bindValue(':contato', $contato);
            $sql->bindValue(':id_produto', $id_produto);
            $sql->execute();

            $array['result'] = [
                'id' => $id,
                'data' => $data,
                'contato' => $contato,
                'id_produto' => $id_produto
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