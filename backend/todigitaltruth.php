<?php

function getBingLink($link)
{
    //получаем контент сайта
    $content = file_get_contents($link);
    //убираем вывод ошибок
    libxml_use_internal_errors(true);
    //получаем объект класса DOMDocument
    $mydom = new DOMDocument();
    //задаём настройки
    $mydom->preserveWhiteSpace = false;
    $mydom->resolveExternals = false;
    $mydom->validateOnParse = false;
    //разбираем HTML
    $mydom->loadHTML($content);
return $mydom->getElementsByTagName('p')[6]->nodeValue;

//    $allLinks = $mydom->getElementsByTagName('a');
//    $arr=[];
}
echo(getBingLink('https://www.digitaltruth.com/cgi-bin/develop.cgi?nominal_temp='.$_POST['nominal_temp'].'&amp;nominal_time='.$_POST['amp;nominal_time'].'&amp;actual_temp='.$_POST['amp;actual_temp'].'&amp;units='.$_POST['amp;units'].'&amp;agitate='.$_POST['amp;agitate'].'&amp;Submit=Submit'));