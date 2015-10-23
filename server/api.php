<?php

$url = $_SERVER['PHP_SELF'];
$script = $_SERVER['SCRIPT_NAME'];
$request = substr($url, strpos($url, $script) + strlen($script) + 1);

$requestParts = explode('/', $request);

if (count($requestParts) < 1) {
  error_log('Invalid request, request=' . $request);
  echo json_encode(array(
    'error' => 'Invalid request, Missing controller'
  ));
  die();
}

$controllerAsStr = array_shift($requestParts);
$controllerName = ucfirst($controllerAsStr) . 'Controller';
$controllerPathName = strtolower($controllerAsStr) . '_controller';
$controllerPath = './controllers/' . $controllerPathName . '.php';
if (!file_exists($controllerPath)) {
  error_log('Invalid controller, controller=' . $controllerAsStr);
  echo json_encode(array(
    'error' => 'Invalid controller'
  ));
  die();
}

require($controllerPath);

$action = array_shift($requestParts);
if (!$action) {
  $action = 'default';
}

$controllerObj = new $controllerName();
call_user_func_array(array(&$controllerObj, $action), $requestParts);