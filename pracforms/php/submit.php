<?php
  $fp = fopen('../json/names.json','w');
  fwrite($fp, json_encode($_POST['valArray']));
  fclose($fp);
?>
