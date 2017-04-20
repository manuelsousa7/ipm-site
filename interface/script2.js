
//Clicar nos botoes das quantidades
function CustomOnClick(index, add) {
	var nome = "Quantidade" + index;
	var old = document.getElementById(nome).innerHTML;

	if (add) {
		old++;
	}
	else if (old >= 1) {
		old--;
	}
	document.getElementById(nome).innerHTML = old;
	UpdatePriceText();
}

function UpdatePriceText() {

	var Calorias = 75, Proteinas = 7, Lipidos = 5, Hidratos = 8;
	var TotalCalorias = 0, TotalProteinas = 0, TotalLipidos = 0, TotalHidratos = 0;

	var PlateNum = 3;
	var contador = 0;
	var i;
	for (i = 0; i < PlateNum; i++) {
		var Texto1 = "Quantidade" + (i+1);
		var Texto2 = "TextoPrato" + (i+1);
		contador += parseFloat(parseInt(document.getElementById(Texto1).innerHTML) * parseFloat(document.getElementById(Texto2).innerHTML));
		TotalCalorias += Calorias * parseInt(document.getElementById(Texto1).innerHTML);
		TotalProteinas += Proteinas * parseInt(document.getElementById(Texto1).innerHTML);
		TotalLipidos += Lipidos * parseInt(document.getElementById(Texto1).innerHTML);
		TotalHidratos += Hidratos * parseInt(document.getElementById(Texto1).innerHTML);
	}

	var textoComSimbolo = contador.toFixed(2) + " €";
	document.getElementById("TotalTexto").innerHTML = contador.toFixed(2);
	document.getElementById("moneyText").innerHTML = textoComSimbolo;
	document.getElementById("TextoCalorias").innerHTML = "Calorias:\t" + TotalCalorias + " g";
	document.getElementById("TextoProteinas").innerHTML = "Proteínas:\t" + TotalProteinas + " g";
	document.getElementById("TextoLipidos").innerHTML = "Lípidos:\t" + TotalLipidos + " g";
	document.getElementById("TextoHidratos").innerHTML = "Hidratos:\t" + TotalHidratos + " g";
}
