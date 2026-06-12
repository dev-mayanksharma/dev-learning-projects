const passbox = document.getElementById("password");
const copyBtn = document.getElementById("copy");
const tick = document.getElementById("tick");

const uc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lc = "abcdefghijklmnopqrstuvwxyz";
const num = "0123456789";
const sym = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

const len = 12;

function generatePassword(){

    let pass = "";

    pass += uc[Math.floor(Math.random() * uc.length)];
    pass += lc[Math.floor(Math.random() * lc.length)];
    pass += num[Math.floor(Math.random() * num.length)];
    pass += sym[Math.floor(Math.random() * sym.length)];

    let all = uc + lc + num + sym;

    for(let i = pass.length; i < len; i++){
        let idx = Math.floor(Math.random() * all.length);
        pass += all[idx];
    }

    let arr = pass.split("");

    for(let i = arr.length - 1; i > 0; i--){

        let j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    pass = arr.join("");

    passbox.value = pass;

    passbox.classList.add("generated");

    setTimeout(() => {
        passbox.classList.remove("generated");
    }, 300);
}

copyBtn.addEventListener("click", () => {

    if(passbox.value === "") return;

    navigator.clipboard.writeText(passbox.value);

    tick.style.opacity = "1";
    tick.style.transform = "scale(1)";

    setTimeout(() => {
        tick.style.opacity = "0";
        tick.style.transform = "scale(0.5)";
    }, 1000);
});