<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$text = $_POST['text-form'];

// ОТПРАВКА НА ПОЧТУ
// ==================================================================================================================


// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Формирование самого письма
$title = "DIGICORN";
$body = "<h2>Заявка с сайта</h2>";

if (!empty($name)) {
    $body .= "<b>Имя:</b> $name<br><br>";
}

if (!empty($phone)) {
    $body .= "<b>Телефон:</b> $phone<br><br>";
}

if (!empty($email)) {
    $body .= "<b>Почта:</b> $email<br><br>";
}

if (!empty($text)) {
    $body .= "<b>Комментарий:</b> $text<br>";
}
// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2; // Раскомментируйте эту строку для отладки
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашего SMTP-сервера
    $mail->Host       = 'mail.hosting.reg.ru';
    $mail->Username   = 'test@digicorn.io';
    $mail->Password   = 'hC3hW7cO2daM5bZ1';
    $mail->SMTPSecure = 'ssl'; // Используйте 'ssl' для порта 465
    $mail->Port       = 465;
    $mail->setFrom('test@digicorn.io', 'DIGICORN');

    // Получатель письма
    $mail->addAddress('hr@digicorn.io');  
    

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    

    // Проверяем отравленность сообщения
    if ($mail->send()) {
        $result = "success";
    } else {
        $result = "error";
    }

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile ?? null, "status" => $status ?? null]);

if ($sendToTelegram) {
    $result = "success";
} else {
    $result = "error";
}

?>