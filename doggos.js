const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const doggos = document.querySelector(".doggos");

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

function addNewDoggo(event) {
    event.preventDefault();

    const promise = fetch(DOG_URL);
    clearBox('random-doggo');
    
    const loadingGif = document.createElement("img");
    loadingGif.src = './loading-buffering.gif';
    loadingGif.alt = 'Loading';
    doggos.appendChild(loadingGif);
    
    promise
        .then(response => response.json())
        .then(processedResponse => {
            const img = document.createElement("img");
            img.src = processedResponse.message;
            img.alt = "Doggo";
            img.style.maxWidth = "500px";
            img.style.maxHeight = "500px";
            clearBox('random-doggo');
            doggos.appendChild(img);
        })
}

const BREEDS_LIST_URL = "https://dog.ceo/api/breeds/list/all";

let breedsSelector = document.getElementById("breed-select");

function populateSelectList() {
    const promise = fetch(BREEDS_LIST_URL);
    let breedName;

    promise
        .then(response => response.json())
        .then(processedResponse => {
            var breedDict = processedResponse.message;

            for(var mainBreed in breedDict) {
                var subBreedList = breedDict[mainBreed];
                
                if(subBreedList.length === 0) {
                    breedName = mainBreed;
                    const option = document.createElement("option");
                    option.value = breedName;
                    option.innerHTML = breedName;
                    breedsSelector.appendChild(option);
                } else {
                    for(var subBreed in subBreedList) {
                        const option = document.createElement("option");
                        option.value = mainBreed + "/" + subBreedList[subBreed];
                        option.innerHTML = subBreedList[subBreed] + " " + mainBreed;
                        breedsSelector.appendChild(option);
                    }
                }
            }
        })
}

populateSelectList();

const breedDoggos = document.getElementById('breed');

function addNewDoggoByBreed(event) {
    event.preventDefault();

    var index = breedsSelector.selectedIndex;
    var value = breedsSelector.options[index].value;
    
    var breed_url = "https://dog.ceo/api/breed/" + value + "/images/random";

    const promise = fetch(breed_url);
    clearBox('breed');

    const loadingGif = document.createElement("img");
    loadingGif.src = './loading-buffering.gif';
    loadingGif.alt = 'Loading';
    breedDoggos.appendChild(loadingGif);

    promise
        .then(function(response) {
            const processingPromise = response.json();
            return processingPromise;
        })
        .then(function (processedResponse) {
            const img = document.createElement("img");
            img.src = processedResponse.message;
            img.alt = "Doggo";
            img.style.maxWidth = "500px";
            img.style.maxHeight = "500px";
            img.className = "loading";
            clearBox('breed');
            breedDoggos.appendChild(img);
        })
}
