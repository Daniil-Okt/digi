<?php 
// ОТПРАВКА НА ПОЧТУ
// ==================================================================================================================

// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Формирование самого письма
$title = "GILDIA";
$body = "
<h2>Заявка с сайта</h2>
<b>Имя:</b> $name<br>
<b>Телефон:</b> $phone<br>
";

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
    $mail->Password   = 'hC3hW7cO2daM5bZ';
    $mail->SMTPSecure = 'ssl'; // Используйте 'ssl' для порта 465
    $mail->Port       = 465;
    $mail->setFrom('test@digicorn.io', 'GILDIA');

    // Получатель письма
    $mail->addAddress('danikoktysyk@gmail.com');  

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