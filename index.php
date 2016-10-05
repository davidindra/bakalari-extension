<html>
<head>
	<meta charset="utf-8">
	<title>Předvídač známky</title>
	<link href='//fonts.googleapis.com/css?family=Open+Sans:400,700&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
</head>
<body>

<style type="text/css">
	body{
		font-family: 'Open Sans';
		font-size: 15px;
	}
	td {
		font-size: 15px;
	}
	td:first-child{
		text-align: right;
	}
	td:last-child{
		font-size: 12px;
	}
	legend{
		font-weight: bold;
		font-size: 13px;
	}

	form{
		margin: 0;
	}

	input.submit{
		width: 30%;
	}
	td.submit{
		text-align: center;
	}

	span.response{
		background-color: #DDDDDD;
		border-radius:5px;
		padding:2px;
	}

	span.shorten{
		margin: 5px 0 0 0;
		display: inline-block;
		font-size: 12px;
		font-style: italic;
		color: #888888;
	}
	a{
		color: #777777;
		text-decoration: underline;
	}
	a:hover{
		text-decoration: none;
	}
</style>

<fieldset style="width: 370px; text-align:center;margin: 100px auto auto auto; border: 2px groove rgb(192,192,192); ">
	<legend>Předvídač známek</legend>
	<form action="index.php" method="GET">
		<table border="0">
			<tr>
				<td>Součet získaných bodů z předmětu:</td>
				<td><input type="number" name="zisk" style="width:50px" min="1" max="300" value="<?php echo $_GET["zisk"]; ?>"> bodů</td>
			</tr>
			<tr>
				<td>Součet maximálních bodů z předmětu:</td>
				<td><input type="number" name="max" style="width:50px" min="1" max="300" value="<?php echo $_GET["max"]; ?>"> bodů</td>
			</tr>
			<tr>
				<td>Písemka bude na</td>
				<td><input type="number" name="pisemka" style="width:50px" min="1" max="300" value="<?php echo $_GET["pisemka"]; ?>"> bodů</td>
			</tr>
			<tr>
				<td>Chci mít z předmětu známku</td>
				<td><select name="chci" style="width:50px">
					<option value="1" <?php if($_GET["chci"] == "1") echo 'selected="selected"'; ?>>1</option>
					<option value="2" <?php if($_GET["chci"] == "2") echo 'selected="selected"'; ?>>2</option>
					<option value="3" <?php if($_GET["chci"] == "3") echo 'selected="selected"'; ?>>3</option>
					<option value="4" <?php if($_GET["chci"] == "4") echo 'selected="selected"'; ?>>4</option>
				</select></td>
			</tr>
			<tr>
				<td colspan="2" class="submit"><input class="submit" type="submit" name="odeslat" value="Vypočítat"></td>
			</tr>
		</table>
	</form>
	<?php
		error_reporting(0);
		if(isset($_GET["odeslat"])){
			$celkove_max = $_GET["max"];
			$celkovy_zisk = $_GET["zisk"];
			$max_pisemky = $_GET["pisemka"];
			$chtena_znamka = $_GET["chci"];
			switch($chtena_znamka){
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
			for($pisemka_zisk = 0; $pisemka_zisk <= $max_pisemky; $pisemka_zisk++){
				if( ($celkovy_zisk + $pisemka_zisk) / ($celkove_max + $max_pisemky) >= $chtena_procenta ){
					echo '<br><span class="response">Pro získání potřebných ' . $chtena_procenta * 100 . '% potřebuješ <b>' . $pisemka_zisk . '</b> bodů.</span>';
					$nalezeno = true;
					break;
				}
			}
			if(!$nalezeno){
				echo '<br><span class="response">Bohužel, dosažení takového výsledku není možné :(</span>';
			}
		}
	?>
</fieldset>

<br>

<?php if(!isset($_GET["odeslat"]) && strpos($_SERVER["HTTP_REFERER"], "baka") === FALSE){ ?>
<center><br><div style="width: 270px;padding:5px;background-color:#FFF47F;">
Nová <b>vychytávka</b>: přetáhni si tento odkaz <a href="javascript:if(document.getElementsByTagName('frameset').length == 0){if(document.getElementsByTagName('style')[0].innerText != '') throw new Error('Uz spusteno');document.getElementsByTagName('style')[0].innerText += '.p:hover{opacity:0.4}';var tabulka = document.getElementsByClassName('radekznamky')[0];}else{ if(parent.frames[1].document.getElementsByTagName('style')[0].innerText != '') throw new Error('Uz spusteno');
 parent.frames[1].document.getElementsByTagName('style')[0].innerText += '.p:hover{opacity:0.4}'; var tabulka = parent.frames[1].document.getElementsByClassName('radekznamky')[0];}var predmety = tabulka.getElementsByTagName('tr'); for(var i = 0; i < predmety.length; i++){ if(i%2 == 0){ var nazevpredm = predmety[i].getElementsByClassName('nazevprcell')[0]; var znamky = predmety[i].getElementsByTagName('table')[0].getElementsByTagName('td'); var zisk = 0; var max = 0; for(var y = 0; y < znamky.length; y++){ if(znamky[y].innerText.length > 1){ zisk += parseInt(znamky[y].innerText); max += parseInt(znamky[y].innerText.split('(max')[1].split('b')[0]); } } var x = nazevpredm.getElementsByTagName('div')[0].innerHTML += '&nbsp;&nbsp;&nbsp;<a target=\'_blank\' href=\'http://skola.davidindra.cz/predvidac/?zisk=' + zisk + '&max=' + max + '\'><img class=\'p\' src=\'data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wYOAAEb011+ZAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAEFSURBVCjPY7RhePGfgUzAxEABYEHmLLwsxKCkw4qi4NO7vww3z/5hmFH5meHW2b+4bb5+6jcDAwMDw/ev/xhunPnFcOPML4YvH/8zmLqyM0w/KsSgaY5iFwMjup8P/xdnuHHmF0Oq6Xu4mFciB0PlPH6G/au/M9SFfSLNz/tX/2BgYGBgEJJgwu1nbIBHkIEhvpqHgYGBgeH2+T+EnY0NPH/whyHd4h3D+5f/8dv8/es/hofX/zD8/cPA8ObZP4bbF34zbJjxneHj6/+Enf3w+h+UAKNJIkHRXD6Hl4GBgYFBXpOFYfZpQYbwYk7iNSvrQXzByc3EoGHCxiCtjD8yGAcsYwAA7a1bCPP4EtAAAAAASUVORK5CYII=\'></a>'; } }"><i>Doplněk Předvídač - Bakaláři</i></a> do svých záložek. Poté už ti stačí jen si otevřít průběžnou klasifikaci v Bakalářích a kliknout na tuto oblíbenou položku. Následně si můžeš kliknout u předmětu, se kterým chceš počítat na ikonku a předvídač se automaticky vyplněný otevře. Už žádné ruční sčítání bodů :) <br><br><i>Testováno v Google Chrome. V případě nefunkčnosti prosím psát na Skype nebo na <a href="mailto:mail@davidindra.cz">mail</a>.</i>
</div></center>
<?php } ?>
</body>
</html>
