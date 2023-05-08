<?php
require('../config.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'post') {

    $data = filter_input(INPUT_POST, 'data');
    $contato = filter_input(INPUT_POST, 'contato');
    $id_produto = filter_input(INPUT_POST, 'id_produto');

    if($contato && $id_produto) {

        $sql = $pdo->prepare("INSERT INTO retirados (data, contato, id_produto) VALUES (:data, :contato, :id_produto)");
        $sql->bindValue(':data', $data);
        $sql->bindValue(':contato', $contato);
        $sql->bindValue(':id_produto', $id_produto);
        $sql->execute();

        $id = $pdo->lastInsertId();

        $array['result'] = [
            'id' => $id,
            'data' => $data,
            'contato' => $contato,
            'id_produto' => $id_produto
        ];

    } else {
        $array['error'] = 'Campos não enviados';
    }

} else {
    $array['error'] = 'Método não permitido (apenas POST)';
}

require('../return.php');