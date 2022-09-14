function runTest(){
    fetch('http://localhost:3000/add-telegraph')
        .then(r => r.json())
        .then(appendCats)
        .catch(console.warn)
};

runTest();
