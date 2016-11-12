<html>
<head>
    <meta charset="utf-8">
    <title>Předvídač známky</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/favicon.ico">

    <link href='//fonts.googleapis.com/css?family=Open+Sans:400,700&subset=latin,latin-ext' rel='stylesheet'
          type='text/css'>

    <link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/fflhnljkmpbpddagaeieamffbkabpoig">

    <style type="text/css">
        body {
            font-family: 'Open Sans';
            font-size: 15px;
            cursor: default;
        }

        div.container {
            text-align: center;
            width: 60%;
            margin: 18vh auto 0;
        }

        img.logo {
            width: 48px;
            height: 48px;
            border: none;
        }

        h1 {
            font-size: 2em;
            margin: 1em 0 .5em;
        }

        div.text {
            margin: 1em 0;
        }

        button {
            border: 0;
            margin: .5em 0;
            padding: 0;
            background-color: transparent;
            cursor: pointer;
            font-size: 1.2em;
            font-family: inherit;
        }

        button img.chrome {
            width: 40px;
            height: 40px;
        }

        button span {

        }
    </style>
</head>
<body>

<div class="container">
    <img class="logo" src="/icon-48.png">

    <h1>
        Předvídač známek
    </h1>

    <div class="text">
        <b>Předvídač</b> prošel velkými změnami k lepšímu. Odteď stačí pouze <b>nainstalovat rozšíření</b> pro prohlížeč
        Chrome (jiné nejsou a nebudou podporovány), které předvídač (a další nové funkce) automaticky doplní do
        Bakalářů.
    </div>

    <button onclick="chrome.webstore.install()" id="install-button">
        <img class="chrome" src="/chrome.png">
        <span>
            Přidat do Chrome
        </span>
    </button>

    <script>
        if (chrome.app.isInstalled) {
            document.getElementById('install-button').disabled = true;
        }
    </script>

    <div class="text">
        V případě nefunkčnosti se na mne obraťte ;)
    </div>
</div>

</body>
</html>

<?php
/*error_reporting(0);
if (isset($_GET["odeslat"])) {
    $celkove_max = $_GET["max"];
    $celkovy_zisk = $_GET["zisk"];
    $max_pisemky = $_GET["pisemka"];
    $chtena_znamka = $_GET["chci"];
    switch ($chtena_znamka) {
        case 1:
            $chtena_procenta = 89.5 / 100;
            break;
        case 2:
            $chtena_procenta = 74.5 / 100;
            break;
        case 3:
            $chtena_procenta = 54.5 / 100;
            break;
        case 4:
            $chtena_procenta = 39.5 / 100;
            break;
    }
    $nalezeno = false;
    for ($pisemka_zisk = 0; $pisemka_zisk <= $max_pisemky; $pisemka_zisk++) {
        if (($celkovy_zisk + $pisemka_zisk) / ($celkove_max + $max_pisemky) >= $chtena_procenta) {
            echo '<br><span class="response">Pro získání potřebných ' . $chtena_procenta * 100 . '% potřebuješ <b>' . $pisemka_zisk . '</b> bodů.</span>';
            $nalezeno = true;
            break;
        }
    }
    if (!$nalezeno) {
        echo '<br><span class="response">Bohužel, dosažení takového výsledku není možné :(</span>';
    }
}*/
?>