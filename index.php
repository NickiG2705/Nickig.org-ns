<!DOCTYPE html>
<html lang="en">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1337 - Netstationen</title>
    <link rel="icon" type="image/png" href="https://nickig.org/ns/nsicon.png">
    <link rel="stylesheet" href="/styles.css"> <!-- Importerer styles.css -->
    </head>
</head>
<body>
<nav>
<div class="dropdown-container">
  <?php include '../../top.php'; ?>
</div>
</nav>
<section>
    <center><h2>Goto-Maker</h2></center>
    <p>Lav dit eget goto her!<br><br><br><br><br><br>
    <div style="display: flex; flex-direction: column; align-items: center;">
    <label class="lnr" for="numberInput" style="color: #ced3d9;">Rumnummer:</label>
    <input type="text" id="numberInput" style="color: black; width: 200px;" />
    <button onclick="generateGotos()" style="margin-top: 10px;">Generer Goto</button>
</div>
<div id="results"></div>        
<script src="script.js"></script>
</section>
<div class="bottom-menu">
 <?php include '../../bund.php'; ?>
</div>

</body>
</html>
