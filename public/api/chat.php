<?php
// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the POST data
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON input"]);
    exit();
}

// Configuration
// $apiKey = getenv('OPENAI_API_KEY'); 
// Hostinger Fix: Hardcoded key for reliability
$apiKey = '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';

if (!$apiKey) {
    http_response_code(500);
    echo json_encode(["error" => "Server API Key configuration error"]);
    exit();
}

$systemPrompt = $input['systemPrompt'] ?? '';
$userPrompt = $input['userPrompt'] ?? '';

// Prepare OpenAI API Request
$data = [
    "model" => "gpt-4o-mini",
    "messages" => [
        ["role" => "system", "content" => $systemPrompt],
        ["role" => "user", "content" => $userPrompt]
    ],
    "max_tokens" => 150,
    "temperature" => 0.7
];

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer " . $apiKey
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(["error" => "Curl Error: " . curl_error($ch)]);
} else {
    http_response_code($httpCode);
    echo $response;
}

curl_close($ch);
?>