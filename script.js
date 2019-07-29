let data = [];
let firstGPUData = {};
let secondGPUData = {};

const minCharacterLimit = 3;

const firstInput = document.querySelector("#autocompleteInput1");
const secondInput = document.querySelector("#autocompleteInput2");

const firstInputContainer = document.querySelector("#autocompleteContainer1");
const secondInputContainer = document.querySelector("#autocompleteContainer2");

const autocompleteResults = document.createElement("ul");


const compareBtn = document.querySelector(".compare-btn");
const clearBtn = document.querySelector(".clear-btn");

const firstGPUStatsDOM = document.querySelector(".first-gpu");
const secondGPUStatsDOM = document.querySelector(".second-gpu");

const getData = () => {
    fetch('https://raw.githubusercontent.com/elationmkd/gpucompare/master/gc.json')
        .then(response => {
            response.json().then(result => {
                data = result;
                console.log(data)
            });
        })
};

const searchData = keyword => {
    return data.filter(item => {
        if (item.name.toLowerCase().includes(keyword.toLowerCase())) {
            return item
        }
    })
};

const clearResults = () => {
    if (autocompleteResults && autocompleteResults.children.length) {
        autocompleteResults.innerHTML = "";
        autocompleteResults.parentElement.removeChild(autocompleteResults)
    }
};

const clearGPUStats = () => {
    firstGPUStatsDOM.innerHTML = "";
    secondGPUStatsDOM.innerHTML = "";
};

const appendResults = (results, inputName) => {

    clearResults();

    for (let i = 0; i < results.length; i++) {
        const resultItem = results[i];
        const resultDOMItem = document.createElement("li");
        resultDOMItem.innerHTML = resultItem.name;
        resultItem.className = `${resultItem.id} resultItem`;
        resultDOMItem.addEventListener("click", ()=>{
            clearResults(autocompleteResults);
            if (inputName === 'firstInput') {
                firstGPUData = resultItem;
                firstInput.value = resultItem.name
            } else {
                secondGPUData = resultItem;
                secondInput.value = resultItem.name;
            }
        });
        autocompleteResults.appendChild(resultDOMItem)

    }

    if (inputName === 'firstInput') {
        firstInputContainer.appendChild(autocompleteResults);
    } else {
        secondInputContainer.appendChild(autocompleteResults);
    }
};

const onInputChange = event => {
        const inputValue = event.target.value;

        if (inputValue && inputValue.length >= minCharacterLimit) {
            const searchResult = searchData(inputValue);
            appendResults(searchResult, event.target.name);
        } else {
            clearResults(autocompleteResults)
        }
};

const compareGPU = event => {
    if (!Object.keys(firstGPUData).length || !Object.keys(secondGPUData).length) {
        return false;
    }
    clearGPUStats();
    renderComparison('firstGPUData');
    renderComparison('secondGPUData');
};

const renderComparison = gpuDataContainerName => {
    const results = [];
    const gpuData = gpuDataContainerName === 'firstGPUData' ? firstGPUData : secondGPUData;
    const gpuContainer = gpuDataContainerName === 'firstGPUData' ? firstGPUStatsDOM : secondGPUStatsDOM;
    for (let key in gpuData) {
        const row = document.createElement("div");
        row.className = "comparison-row";

        const dataKey = document.createElement("div");
        dataKey.innerHTML = key;

        const dataValue = document.createElement("div");
        dataValue.innerHTML = gpuData[key];

        row.appendChild(dataKey);
        row.appendChild(dataValue);

        results.push(row);
        gpuContainer.appendChild(row);
    }
};

const setEventListeners = element => {
    element.addEventListener("input", onInputChange);
    // element.addEventListener("blur", clearResults);
    compareBtn.addEventListener("click", compareGPU);
    clearBtn.addEventListener("click", ()=>{
        clearGPUStats();
    });
};

window.onload = () => {
    setEventListeners(firstInput);
    setEventListeners(secondInput);
    getData();
};