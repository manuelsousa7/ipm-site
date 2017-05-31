var numPratos = 8;
var lastIndex = 0;
var ignore = 0;
//Clicar nos botoes das quantidades
function CustomOnClick(index, add) {
	var nome = "Quantidade" + index.toString();

	var listaPratos = JSON.parse(localStorage.getItem("listaPratos"));
	var old = listaPratos[index - 1].quant;

	if (add) {
		old++;
		lastIndex = index;
	}
	else if (old >= 1) { 
		old--;
	}

	listaPratos[index - 1].quant = old;
	document.getElementById(nome).innerHTML = old;

	localStorage.setItem("listaPratos", JSON.stringify(listaPratos)); 
	UpdatePriceText();
}

//remover pratos da lista
function CustomOnClick2(index) {

	var listaPratos = JSON.parse(localStorage.getItem("listaPratos"));
	listaPratos.splice(index - 1, 1);
	localStorage.setItem("listaPratos", JSON.stringify(listaPratos));
	document.getElementById("Table1").deleteRow(index);

	var nomes = ["TextoPrato", "QuadradoMenos", "Quantidade", "QuadradoMais", "Remove"];

	for (i = index-1; i < listaPratos.length; i++) {

		document.getElementById(nomes[0] + (i + 2)).setAttribute("id", nomes[0] + (i + 1));

		document.getElementById(nomes[1] + (i + 2)).setAttribute("id", nomes[1] + (i + 1));
		document.getElementById(nomes[2] + (i + 2)).setAttribute("id", nomes[2] + (i + 1));
		document.getElementById(nomes[3] + (i + 2)).setAttribute("id", nomes[3] + (i + 1));

		newClick0 = "CustomOnClick(" + (i + 1) + ", false)";
		newClick2 = "CustomOnClick(" + (i + 1) + ", true)";

		document.getElementById(nomes[1] + (i + 1)).setAttribute("onclick", newClick0);
		document.getElementById(nomes[3] + (i + 1)).setAttribute("onclick", newClick2);

		newClick = "CustomOnClick2(" + (i + 1) + ")";

		document.getElementById(nomes[4] + (listaPratos.length + 1)).setAttribute("id", nomes[4] + (i + 1));
		document.getElementById(nomes[4] + (i + 1)).setAttribute("onclick", newClick);
	}

	UpdatePriceText();
	
}

function UpdatePriceText() {

	var TotalCalorias = 0, TotalProteinas = 0, TotalLipidos = 0, TotalHidratos = 0;

	var contador = 0;
	var i;

	var listaPratos = JSON.parse(localStorage.getItem("listaPratos"));

	for (i = 1; i <= listaPratos.length; i++) {
		var Texto = "Quantidade" + i;
		var Quant = parseInt(document.getElementById(Texto).innerHTML);
		contador += listaPratos[i-1].preco * Quant;
		TotalCalorias += listaPratos[i-1].calorias * Quant;
		TotalProteinas += listaPratos[i-1].proteinas * Quant;
		TotalLipidos += listaPratos[i-1].lipidos * Quant;
		TotalHidratos += listaPratos[i-1].hidratos * Quant;
	}

	var textoComSimbolo = contador.toFixed(2) + " €";
	document.getElementById("TotalTexto").innerHTML = contador.toFixed(2);
	document.getElementById("moneyText").innerHTML = textoComSimbolo;
	document.getElementById("TextoCalorias").innerHTML = "Calorias:\t" + TotalCalorias + "kcal";
	if(TotalCalorias>=localStorage.calories && TotalCalorias>=2000){myFatPopUp();}
	document.getElementById("TextoProteinas").innerHTML = "Proteínas:\t" + TotalProteinas + " g";
	document.getElementById("TextoLipidos").innerHTML = "Lípidos:\t" + TotalLipidos + " g";
	document.getElementById("TextoHidratos").innerHTML = "Hidratos:\t" + TotalHidratos + " g";
}

function myFatPopUp() {
		if(ignore == 1){return;}
	    var popup = document.getElementById("fatPopup");
	    popup.classList.toggle("show");
}

function CarregaPratos() {
	var i;
	var quantityElement = document.getElementsByClassName("Quantidade");
	var table = document.getElementById("Table1");
	var nomes = ["TextoPrato", "QuadradoMenos", "Quantidade", "QuadradoMais", "Remove"];

	for (i = 1; i <= pratos.length; i++) {

		var newTr = table.insertRow(i);
		if (pratos[i-1].nome.length > caloryThreshold) {
			newTr.setAttribute("style", "font-size: 1.7em; border-top: solid var(--border_color); background-color: #dbbc83");
			newTr.setAttribute("title", "Atenção: " + pratos[i-1].nome + " tem muitas calorias!");
		}
		else {
			newTr.setAttribute("style", "font-size: 1.7em; border-top: solid var(--border_color);");
		}

		var newTd = [newTr.insertCell(0), newTr.insertCell(1), newTr.insertCell(2), newTr.insertCell(3)];
		newTd[0].setAttribute("width", "25%");
		newTd[1].setAttribute("width", "25%");
		newTd[2].setAttribute("width", "18%");
		newTd[3].setAttribute("width", "7%");
		newTd[0].setAttribute("height", "80");
		newTd[1].setAttribute("height", "80");
		newTd[2].setAttribute("height", "80");
		newTd[3].setAttribute("height", "60");

		newTd[1].setAttribute("id", nomes[0] + i);
		newTd[2].setAttribute("style", "min-width: 150px");

		newTd[0].appendChild(document.createTextNode(pratos[i-1].nome));
		newTd[1].appendChild(document.createTextNode((pratos[i-1].preco).toFixed(2)));

		var newQuantity = quantityElement[0].cloneNode(true);

		newQuantity.setAttribute("style", "display: all;");
		newQuantity.children[0].setAttribute("id", nomes[1] + i);
		newQuantity.children[1].setAttribute("id", nomes[2] + i);
		newQuantity.children[2].setAttribute("id", nomes[3] + i);

			var listaPratos = JSON.parse(localStorage.getItem("listaPratos"));
			newQuantity.children[1].innerHTML = pratos[i - 1].quant;

		newClick0 = "CustomOnClick(" + i + ", false)";
		newClick2 = "CustomOnClick(" + i + ", true)";

		newQuantity.children[0].setAttribute("onclick", newClick0);
		newQuantity.children[2].setAttribute("onclick", newClick2);

		newTd[2].appendChild(newQuantity);

		var newRemove = (document.getElementsByClassName("Remover"))[0].cloneNode(true);
		newRemove.setAttribute("style", "display: all;");

		newClick = "CustomOnClick2(" + (i) + ")";

		newRemove.children[0].setAttribute("id", nomes[4] + i);
		newRemove.children[0].setAttribute("onclick", newClick);

		newTd[3].appendChild(newRemove);
	}
};

var pratos = [];

window.onload = function() {

	var lista = localStorage.getItem("listaPratos");
	pratos = JSON.parse(lista);
	CarregaPratos();
	UpdatePriceText();
}
