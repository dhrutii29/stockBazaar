const api_url = "http://localhost:8000/api/news"

function loadData(records = []) {
	
	for(let i=0; i<records.length; i++) {
		document.getElementById("card").innerHTML += `<div class="card" style="width: 30rem; height: 50rem">
        <img src="${records[i].urlToImage}" class="card-img-top" alt="..." style="width: 30rem; height: 167px">
        <div class="card-body d-flex flex-column">
        <h5 class="card-title">${records[i].title}</h5>
        <p class="card-text">${records[i].content}</p>
        <a href="${records[i].url}" class="btn news mt-auto btn-primary" target = "_blank">Read More</a>
        </div>
        </div>`
	
    }
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data.articles);
	});
    
}