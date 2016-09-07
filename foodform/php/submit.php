<?php
  $fp = fopen('../json/menu.json','w');
  fwrite($fp, json_encode($_POST['valArray']));
  fclose($fp);
?>
