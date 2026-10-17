<?php
// send.php - Обработчик заявок с сайта KUCH Agency

// Настройки
$recipient_email = 'info@kuchgroup.uz'; // Почта компании для получения заявок
$site_name = 'KUCH Agency';

// Разрешаем CORS (при необходимости) и устанавливаем заголовок JSON
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// Обработка OPTIONS запросов для CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Метод не поддерживается']);
    exit();
}

// Получаем тело запроса
$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true);

if (!$data) {
    // Пробуем получить данные из $_POST
    $data = $_POST;
}

$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$contact = isset($data['contact']) ? trim(strip_tags($data['contact'])) : '';
$type = isset($data['type']) ? trim(strip_tags($data['type'])) : '';
$budget = isset($data['budget']) ? trim(strip_tags($data['budget'])) : '';
$timeline = isset($data['timeline']) ? trim(strip_tags($data['timeline'])) : '';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';
$source = isset($data['source']) ? trim(strip_tags($data['source'])) : 'Сайт';
$ts = isset($data['ts']) ? trim(strip_tags($data['ts'])) : date('Y-m-d H:i:s');

if (empty($name) || empty($contact)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Заполните обязательные поля (имя и контакт)']);
    exit();
}

// Тема письма
$is_brief = ($source === '/brief' || !empty($type));
$form_title = $is_brief ? 'Бриф / Заявка на проект' : 'Заявка с сайта';
$subject = "Новая заявка: {$form_title} от {$name} — {$site_name}";

// Формирование HTML-сообщения
$html = '
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>' . htmlspecialchars($subject) . '</title>
<style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #0d0d0d; color: #ffffff; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #18181b; border: 1px solid #ff2a85; padding: 30px; border-radius: 8px; }
    .header { border-bottom: 2px solid #ff2a85; padding-bottom: 15px; margin-bottom: 20px; }
    .header h2 { color: #ff2a85; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; }
    .field { margin-bottom: 15px; }
    .label { font-size: 12px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .value { font-size: 16px; color: #ffffff; font-weight: 500; }
    .message-box { background: #27272a; padding: 15px; border-left: 3px solid #ff2a85; margin-top: 10px; white-space: pre-wrap; }
    .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #27272a; font-size: 12px; color: #71717a; text-align: center; }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        <h2>' . htmlspecialchars($form_title) . '</h2>
    </div>
    
    <div class="field">
        <div class="label">Имя</div>
        <div class="value">' . htmlspecialchars($name) . '</div>
    </div>
    
    <div class="field">
        <div class="label">Контакт (телефон / Telegram / Email)</div>
        <div class="value"><a href="' . (filter_var($contact, FILTER_VALIDATE_EMAIL) ? 'mailto:' : 'tel:') . htmlspecialchars($contact) . '" style="color: #ff2a85; text-decoration: none;">' . htmlspecialchars($contact) . '</a></div>
    </div>';

if (!empty($type)) {
    $html .= '
    <div class="field">
        <div class="label">Тип проекта</div>
        <div class="value">' . htmlspecialchars($type) . '</div>
    </div>';
}

if (!empty($budget)) {
    $html .= '
    <div class="field">
        <div class="label">Ориентировочный бюджет</div>
        <div class="value">' . htmlspecialchars($budget) . '</div>
    </div>';
}

if (!empty($timeline)) {
    $html .= '
    <div class="field">
        <div class="label">Желаемые сроки</div>
        <div class="value">' . htmlspecialchars($timeline) . '</div>
    </div>';
}

if (!empty($message)) {
    $html .= '
    <div class="field">
        <div class="label">Задача / Сообщение</div>
        <div class="message-box">' . nl2br(htmlspecialchars($message)) . '</div>
    </div>';
}

$html .= '
    <div class="field" style="margin-top: 20px;">
        <div class="label">Источник заявки</div>
        <div class="value" style="font-size: 13px; color: #a1a1aa;">' . htmlspecialchars($source) . '</div>
    </div>

    <div class="footer">
        Сообщение отправлено автоматически с формы обратной связи ' . htmlspecialchars($site_name) . ' (' . htmlspecialchars($ts) . ')
    </div>
</div>
</body>
</html>';

// Заголовки письма
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: ' . mb_encode_mimeheader($site_name) . ' <no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'kuchgroup.uz') . '>';

if (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $contact;
}

$headers_str = implode("\r\n", $headers);

// Отправка письма
$mail_sent = @mail($recipient_email, mb_encode_mimeheader($subject), $html, $headers_str);

if ($mail_sent) {
    echo json_encode(['ok' => true, 'message' => 'Заявка успешно отправлена']);
} else {
    // В случае ошибки при отправке через mail()
    error_log("Failed to send lead email for {$name} ({$contact})");
    echo json_encode(['ok' => true, 'warning' => 'Заявка сохранена, но письмо не удалось отправить через серверную почту']);
}
