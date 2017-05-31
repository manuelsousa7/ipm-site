window.onload = function() {
	newIndex = "0";
	localStorage.setItem("IndexMenu", "0");
	var imagem = document.getElementById("Imagem");
	var descricao = JSON.parse(localStorage.getItem("pratoSelecao"));
	imagem.setAttribute("src", descricao.imagem);
	document.getElementById("NomePrato").innerHTML = descricao.prato.nome;
	document.getElementById("PrecoPrato").innerHTML = descricao.prato.preco.toFixed(2) + " €";

	document.getElementById("TextoCalorias").innerHTML = "Calorias:\t" + descricao.prato.calorias + " kcal";
	document.getElementById("TextoProteinas").innerHTML = "Proteínas:\t" + descricao.prato.proteinas + " g";
	document.getElementById("TextoLipidos").innerHTML = "Lípidos:\t" + descricao.prato.lipidos + " g";
	document.getElementById("TextoHidratos").innerHTML = "Hidratos:\t" + descricao.prato.hidratos + " g";

}

var newIndex = -1;

function change(){
	window.top.location.href = "../tabelanut/index.html";
}

function change2(){
	var personalizar = JSON.parse(localStorage.getItem("pratoSelecao"));
	window.location.href = personalizar.personalizar;
}

function chamada() {
	var novosPratos = JSON.parse(localStorage.getItem("listaPratos"));
	localStorage.setItem("Tabela", "Sim");
}

function doit(){
	localStorage.per = 1;
	localStorage.setItem("PersName","Carne do Algarve");
	chamada();
}
	
setInterval(
	function() {
		if (newIndex != -1 && localStorage.getItem("IndexMenu") != newIndex) {

			switch (localStorage.getItem("IndexMenu")) {
				case "1":
					window.location.href = "comida1.html";
					localStorage.setItem("IndexMenu", "1");
					break;

				case "2":
					window.location.href = "comida2.html";
					localStorage.setItem("IndexMenu", "2");
					break;

				case "3":
					window.location.href = "comida3.html";
					localStorage.setItem("IndexMenu", "3");
					break;
			}

		}
	}
, 100);