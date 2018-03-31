<?php
function getBingLink($link)
{
    $content = file_get_contents($link);
    libxml_use_internal_errors(true);
    $mydom = new DOMDocument();
    $mydom->preserveWhiteSpace = false;
    $mydom->resolveExternals = false;
    $mydom->validateOnParse = false;
    //разбираем HTML
    $mydom->loadHTML($content);
    return $mydom->getElementsByTagName('p')[6]->nodeValue;
}

echo(getBingLink('https://www.digitaltruth.com/cgi-bin/develop.cgi?nominal_temp=' . $_POST['nominal_temp'] . '&amp;nominal_time=' . $_POST['amp;nominal_time'] . '&amp;actual_temp=' . $_POST['amp;actual_temp'] . '&amp;units=' . $_POST['amp;units'] . '&amp;agitate=' . $_POST['amp;agitate'] . '&amp;Submit=Submit'));