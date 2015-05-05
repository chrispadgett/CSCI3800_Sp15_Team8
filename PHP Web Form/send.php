<html>
<body>

<?php

$UserHeader = "User: ";
$AmountHeader = "Amount: ";
$ZipHeader = "Zip: ";
$CardTypeHeader = "Card Type: ";
$CardNumberHeader = "Card Number: ";
$ExpMonthHeader = "Expiration: ";
$ExpYearHeader = "Year: ";
$CVVHeader = "CVV: ";

//Concatenate variables to pass into header func
$user = $UserHeader . "paymentuser";
$amount = $AmountHeader . "transactionAmount";
$zipcode = $ZipHeader . "zip";
$cardtyp = $CardTypeHeader . "cardType";
$cardn = $CardNumberHeader . "cardNum";
$cardmonth = $ExpMonthHeader . "cardExpMonth";
$cardyear = $ExpYearHeader . "cardExpYear";
$cv = $CVVHeader . "cvv";

header($user);
header($amount);
header($zipcode);
header($cardtyp);
header($cardn);
header($cardmonth);
header($cardyear);
header($cv);
?>

</body>
</html>