window.addEventListener('load', () => {
    load();
    document.querySelector("#my-audio").volume = 0.3;
});

async function load(){
    const response = await fetch('/pets');
    const pets = await response.json();
    for (const pet of pets) {
        const petlist = document.querySelector("#petList");
        const li = document.createElement('li');
        li.textContent = pet.petId + " " + pet.petName + " ";
        const a = document.createElement('a');
        a.textContent = 'load';
        a.href=`pet.html?ID=${pet.petId}`;
        li.appendChild(a);
        petlist.append(li);
    }
}