
var contador = 0;
var caloryThreshold = 10;

function AdicionaTabela() {
	
	var descricao = JSON.parse(localStorage.getItem("pratoSelecao"));

	var nomes = ["TextoPrato", "QuadradoMenos", "Quantidade", "QuadradoMais", "Remove"];

	var listaPratos = JSON.parse(localStorage.getItem("listaPratos"));
	var i;
	if(localStorage.per==1){
		var n = localStorage.getItem("PersName");
		localStorage.per = 0;
		descricao.prato.personalizado = true;
		descricao.prato.nome = n.concat("*");
	}
	if(!descricao.prato.personalizado){
		for (i = 0; i < listaPratos.length; i++) {
			if (listaPratos[i].nome == descricao.prato.nome) {
				CustomOnClick(i + 1, true);
				return;
			} 
		}
	}

	var table = document.getElementById("TabelaPratos");
	//alert(contador);
	var newTr = table.insertRow(contador++);

	if (descricao.prato.nome.length > caloryThreshold) {
		newTr.setAttribute("style", "font-size: 1.7em; border-top: solid var(--border_color); background-color: #dbbc83");
		newTr.setAttribute("title", "Atenção: " + descricao.prato.nome + " tem muitas calorias!");
	}
	else {
		newTr.setAttribute("style", "font-size: 1.7em; border-top: solid var(--border_color);");
	}

	var newTd = [newTr.insertCell(0), newTr.insertCell(1), newTr.insertCell(2), newTr.insertCell(3)];
	newTd[0].setAttribute("width", "30%");
	newTd[1].setAttribute("width", "12%");
	newTd[2].setAttribute("width", "35%");
	newTd[3].setAttribute("width", "10%");
	newTd[0].setAttribute("height", "80");
	newTd[1].setAttribute("height", "80");
	newTd[2].setAttribute("height", "80");
	newTd[3].setAttribute("height", "80");

	newTd[1].setAttribute("id", nomes[0] + contador);

	newTd[0].appendChild(document.createTextNode(descricao.prato.nome));
	newTd[1].appendChild(document.createTextNode(descricao.prato.preco.toFixed(2)));

	listaPratos.push(descricao.prato);

	localStorage.setItem("listaPratos", JSON.stringify(listaPratos));

	var newQuantity = (document.getElementsByClassName("Quantidade"))[0].cloneNode(true);

	newQuantity.setAttribute("style", "display: all;");
	newQuantity.children[0].setAttribute("id", nomes[1] + contador);
	newQuantity.children[1].setAttribute("id", nomes[2] + contador);
	newQuantity.children[2].setAttribute("id", nomes[3] + contador);

		newQuantity.children[1].innerHTML = descricao.prato.quant;

	newClick0 = "CustomOnClick(" + contador + ", false)";
	newClick2 = "CustomOnClick(" + contador + ", true)";

	newQuantity.children[0].setAttribute("onclick", newClick0);
	newQuantity.children[2].setAttribute("onclick", newClick2);

	newTd[2].appendChild(newQuantity);
	newTd[2].setAttribute("display", "inline");


	var newRemove = (document.getElementsByClassName("Remover"))[0].cloneNode(true);
	newRemove.setAttribute("style", "display: all;");

	newClick = "CustomOnClick2(" + contador + ")";

	newRemove.children[0].setAttribute("id", nomes[4] + contador);
	newRemove.children[0].setAttribute("onclick", newClick);

	newTd[3].appendChild(newRemove);
	newTd[3].setAttribute("display", "inline");

}

function AdicionaTabela2(prato) {
	
	var nomes = ["TextoPrato", "QuadradoMenos", "Quantidade", "QuadradoMais", "Remove"];

	var listaPratos = JSON.parse(localStorage.getItem("listaPratos"));
	var i;

	var table = document.getElementById("TabelaPratos");
	var newTr = table.insertRow(contador++);

	if (prato.nome.length > caloryThreshold) {
		newTr.setAttribute("style", "font-size: 1.7em; border-top: solid var(--border_color); background-color: #dbbc83");
		newTr.setAttribute("title", "Atenção: " + prato.nome + " tem muitas calorias!");
	}
	else {
		newTr.setAttribute("style", "font-size: 1.7em; border-top: solid var(--border_color);");
	}

	var newTd = [newTr.insertCell(0), newTr.insertCell(1), newTr.insertCell(2), newTr.insertCell(3)];
	newTd[0].setAttribute("width", "30%");
	newTd[1].setAttribute("width", "12%");
	newTd[2].setAttribute("width", "35%");
	newTd[3].setAttribute("width", "10%");
	newTd[0].setAttribute("height", "80");
	newTd[1].setAttribute("height", "80");
	newTd[2].setAttribute("height", "80");
	newTd[3].setAttribute("height", "80");

	newTd[1].setAttribute("id", nomes[0] + contador);

	newTd[0].appendChild(document.createTextNode(prato.nome));
	newTd[1].appendChild(document.createTextNode(prato.preco.toFixed(2)));

	var newQuantity = (document.getElementsByClassName("Quantidade"))[0].cloneNode(true);

	newQuantity.setAttribute("style", "display: all;");
	newQuantity.children[0].setAttribute("id", nomes[1] + contador);
	newQuantity.children[1].setAttribute("id", nomes[2] + contador);
	newQuantity.children[2].setAttribute("id", nomes[3] + contador);

		newQuantity.children[1].innerHTML = prato.quant;

	newClick0 = "CustomOnClick(" + contador + ", false)";
	newClick2 = "CustomOnClick(" + contador + ", true)";

	newQuantity.children[0].setAttribute("onclick", newClick0);
	newQuantity.children[2].setAttribute("onclick", newClick2);

	newTd[2].appendChild(newQuantity);
	newTd[2].setAttribute("display", "inline");

	var newRemove = (document.getElementsByClassName("Remover"))[0].cloneNode(true);
	newRemove.setAttribute("style", "display: all;");

	newClick = "CustomOnClick2(" + (contador) + ")";

	newRemove.children[0].setAttribute("id", nomes[4] + contador);
	newRemove.children[0].setAttribute("onclick", newClick);

	newTd[3].appendChild(newRemove);
	newTd[3].setAttribute("display", "inline");
}

window.onload = function() {
	var listaPratos = JSON.parse(localStorage.getItem("listaPratos"));
	contador = 0;
	if (listaPratos.length == 0) {
		var lista = [];
		localStorage.setItem("listaPratos", JSON.stringify(lista));
	}
	else {
		var i;
		for (i = 0; i < listaPratos.length; i++) {
			AdicionaTabela2(listaPratos[i]);
		}
	}
}

//Clicar nos botoes das quantidades
function CustomOnClick(index, add) {
	var nome = "Quantidade" + index.toString();

	var listaPratos = JSON.parse(localStorage.getItem("listaPratos"));
	var old = listaPratos[index - 1].quant;

	if (add) {
		old++;
		lastIndex = index - 1;
	}
	else if (old >= 1) { 
		old--;
	}

	listaPratos[index - 1].quant = old;
	document.getElementById(nome).innerHTML = old;
	localStorage.setItem("listaPratos", JSON.stringify(listaPratos));   	
}

//remover pratos da lista
function CustomOnClick2(index) {

	var listaPratos = JSON.parse(localStorage.getItem("listaPratos"));
	listaPratos.splice(index - 1, 1);
	localStorage.setItem("listaPratos", JSON.stringify(listaPratos));
	document.getElementById("TabelaPratos").deleteRow(index - 1);

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

		document.getElementById(nomes[4] + contador).setAttribute("id", nomes[4] + (i + 1));
		document.getElementById(nomes[4] + (i + 1)).setAttribute("onclick", newClick);
	}
	
	contador--;
}
function save(){
			localStorage.per = 1;
			localStorage.setItem("PersName","Carne do Algarve");
			AdicionaTabela();
}

setInterval(
	function() {
		if (localStorage.getItem("Tabela") == "Sim") {
			localStorage.setItem("Tabela", "Nao");
			AdicionaTabela();
		}
	}
, 100);

