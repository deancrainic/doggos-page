const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const doggos = document.querySelector(".doggos");

function addNewDoggo() {
    const promise = fetch(DOG_URL);

    promise
        .then(function(response) {
            const processingPromise = response.json();
            return processingPromise;
        })
        .then(function(processedResponse) {
            const img = document.createElement("img");
            img.src = processedResponse.message;
            img.alt = "Doggo";
            doggos.appendChild(img);
        })
}

document.querySelector(".add-doggo").addEventListener("click", addNewDoggo);

const BREEDS_LIST_URL = "https://dog.ceo/api/breeds/list/all";

let breedsSelector = document.getElementById("breed-select");

function populateSelectList() {
    const promise = fetch(BREEDS_LIST_URL);
    let breedName;

    promise
        .then(function(response) {
            const processingPromise = response.json();
            return processingPromise;
        })
        .then(function(processedResponse) {
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

function addNewDoggoByBreed() {
    var index = breedsSelector.selectedIndex;
    var value = breedsSelector.options[index].value;
    
    var breed_url = "https://dog.ceo/api/breed/" + value + "/images/random";

    const promise = fetch(breed_url);

    promise
        .then(function(response) {
            const processingPromise = response.json();
            return processingPromise;
        })
        .then(function (processedResponse) {
            const img = document.createElement("img");
            img.src = processedResponse.message;
            img.alt = "Doggo";
            breedDoggos.appendChild(img);
        })

}

document.querySelector(".add-doggo-breed").addEventListener("click", addNewDoggoByBreed);