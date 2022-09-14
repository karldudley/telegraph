function runTest(){
    fetch('http://localhost:3000/add-telegraph')
        .then(r => r.json())
        .then(appendCats)
        .catch(console.warn)
};

runTest();

const formData = document.querySelector('#form-data')

// form.addEventListener('submit', submitForm);

// function submitForm(e) {
//     e.preventDefault();

//     const formData = {
//         name: e.target.name.value,
//         age: e.target.age.value,
//         title: e.target.name.value
//     };

//     const options = {
//         method: 'POST',
//         body: JSON.stringify(formData),
//         headers: { "Content-Type": "application/json" }
//     };

//     fetch('http://localhost:3000/add-telegraph/', options)
//         .then(r => r.json())
//         // .then(appendDog)
//         .then(() => e.target.reset())
//         .catch(console.warn)
// };
