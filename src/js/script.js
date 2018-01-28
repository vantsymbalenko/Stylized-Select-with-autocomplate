window.onload = function(){
	createAutocomplete();
}

function createAutocomplete(){
	var input = document.querySelector('.container > .wrapper > input'),
		svg = document.querySelector(".container > .wrapper > .icon-select");

	svg .style.display = "none";
	svg.addEventListener("click", clear);
	input.addEventListener("keyup",search, false);
}

function search(e){
	var ul = document.querySelector('.container > .options > ul'),
		svg = document.querySelector(".container > .wrapper > .icon-select");

	svg.style.display = "block";
	ul.style.height = "120px";
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}

	for(var i = 0; i < country.length; i++){
		if(country[i].includes(e.target.value)){
			var li = document.createElement("li");
			li.innerHTML = country[i];
			li.addEventListener("click", chooseCity.bind(null, li));
			ul.appendChild(li);
		}
	}
}

function chooseCity(element){
	var ul = document.querySelector('.container > .options > ul'),
		input = document.querySelector(".container > .wrapper > input"),
		value = element.innerHTML;

	ul.style.height = "0px";
	input.value = value;
}

function clear(){
	var input = document.querySelector(".container > .wrapper > input"),
		ul = document.querySelector('.container > .options > ul');

	ul.style.height = "0px";
	input.value = '';

}