Prato = function(nome, preco) {
	this.nome = nome;
	this.preco = preco;
	this.calorias = nome.length * 17;
	this.proteinas = nome.length * 5;
	this.lipidos = nome.length * 3;
	this.hidratos = nome.length * 10;
	this.tempo = nome.length * 0.5;
}

var listaPratos = [];

var caloryThreshold = 10;

function AdicionarPrato(nome, preco) {
	listaPratos.push(new Prato(nome, preco));
}

function RemoverPrato(nome) {
	var i;
	for (i = 0; i < listaPratos.length; i++) {
		if (listaPratos[i].nome == nome) {
			var array_1 = listaPratos.slice(0, i);
			var array_2 = listaPratos.slice(i, listaPratos.length-1);
			listaPratos = array_1.concat(array_2);
			return;
		}
	}
}

window.onload = function() {

	AdicionarPrato("Bife", 9.50);
	AdicionarPrato("Batatas Fritas", 2.50);
	AdicionarPrato("Coca-Cola", 1.50);
	AdicionarPrato("Azeitonas", 0.50);

	CarregaPratos();
	UpdatePriceText();
}