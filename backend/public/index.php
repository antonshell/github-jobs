<?php

use Klein\Request;
use Klein\Response;
use src\GithubJobs\ApiClient;

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../_bootstrap.php';

$klein = new \Klein\Klein();
$client = new ApiClient();

$klein->respond('GET', '/', function (Request $request, Response $response) use ($client) {
    $data = ['key1' => 'val1'];
    $response->json($data);
});

$klein->respond('GET', '/express_backend', function (Request $request, Response $response) use ($client) {
    $data = ['key1' => 'val1'];
    $response->json($data);
});

$klein->respond('GET', '/server/search', function (Request $request, Response $response) use ($client) {

    $params = $request->paramsGet()->all();

    $data = $client->search($params);
    $response->json($data);
});

$klein->respond('GET', '/server/get/[:id]', function (Request $request, Response $response) use ($client) {
    $id = $request->param('id');
    $data = $client->get($id);
    $response->json($data);
});

$klein->dispatch();