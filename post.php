<?php

/* DEMO PURPOSES ONLY */
/* You should never blindy echo user input */
foreach ($_POST as $key => $value) {
  echo "<img src=\"{$value}\">";
}
