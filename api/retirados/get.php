<?php
require('../config.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'get') {

    $id = filter_input(INPUT_GET, 'id');

    if($id) {

        $sql = $pdo->prepare("SELECT * FROM retirados WHERE id = :id");
        $sql->bindValue(':id', $id);
        $sql->execute();

        if($sql->rowCount() > 0) {

            $data = $sql->fetch(PDO::FETCH_ASSOC);

            $array['result'] = [
                'id' => $data['id'],
                'data' => $data['data'],
                'contato' => $data['contato'],
                'id_produto' => $data['id_produto']
            ];

        } else {
            $array['error'] = 'ID inexistente';
        }

    } else {
        $array['error'] = 'ID não enviado';
    }

} else {
    $array['error'] = 'Método não permitido (apenas GET)';
}

require('../return.php');