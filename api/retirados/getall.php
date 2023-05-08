<?php
require('../config.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'get') {

    $sql = $pdo->query("SELECT * FROM retirados ORDER BY id DESC");
    if($sql->rowCount() > 0) {
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);

        foreach($data as $item) {
            $array['result'][] = [
                'id' => $item['id'],
                'data' => $item['data'],
                'contato' => $item['contato'],
                'id_produto' => $item['id_produto']
            ];
        }
    }

} else {
    $array['error'] = 'Método não permitido (apenas GET)';
}

require('../return.php');