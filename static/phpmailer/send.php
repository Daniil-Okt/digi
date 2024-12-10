<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['tel'];
$text = $_POST['text'];
$nights = $_POST['nights'];
$adults = $_POST['adults'];
$kid = $_POST['kid'];
$prices = $_POST['prices'];


// Формирование самого письма
$title = "Pegas Турция";
$body = "
<h2>Заявка с сайта</h2>
<b>Имя:</b> $name<br>
<b>Телефон:</b> $phone<br>
<b>Пожелания:</b> $text<br>
<b>Количество ночей:</b> $nights<br>
<b>Количество взрослых:</b> $adults<br>
<b>Количество детей:</b> $kid<br>
<b>Бюджет:</b> $prices<br>
";
// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    $mail->Host       = 'smtp.mail.ru'; 
    $mail->Username   = 'web-prog-dn@mail.ru'; 
    $mail->Password   = '6W1EU4RUb7ptcmCvtHCQ';
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('web-prog-dn@mail.ru', 'Pegas'); 
    // Получатель письма
    $mail->addAddress('it.business.systems@gmail.com');  
    $mail->addAddress('21pegas@mail.ru');


// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);