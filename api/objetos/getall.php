<?php
require('../config.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'get') {

    $sql = $pdo->query("SELECT * FROM objetos ORDER BY id DESC");
    
    if($sql->rowCount() > 0) {
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);

        foreach($data as $item) {
            $array['result'][] = [
                'id' => $item['id'],
                'nome' => $item['nome'],
                'descricao' => $item['descricao'],
                'local' => $item['local'],
                'data' => $item['data'],
                'status_retirada' => $item['status_retirada'],
                'status_reservado' => $item['status_reservado'],                
                'id_categoria' => $item['id_categoria']
            ];
        }
    }

} else {
    $array['error'] = 'Método não permitido (apenas GET)';
}

require('../return.php');