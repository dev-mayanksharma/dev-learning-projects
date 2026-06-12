const quotes = [
  "Success is the sum of small efforts repeated daily.",
  "Discipline beats motivation.",
  "Done is better than perfect.",
  "Your future is created by what you do today.",
  "Small progress is still progress.",
  "The best way to learn is by building.",
  "Consistency compounds over time.",
  "Focus on the process, not the outcome.",
  "Every expert was once a beginner.",
  "Hard work puts you where luck can find you."
];

const btn = document.querySelector('button'); // kya kia ?? = ek button s response lene ke liye ek object 
const quote = document.querySelector('h1');// quote ko ek object bnaya  
btn.addEventListener('click',()=>{  // btn  pe event listner ka typpe lgaya and response detect krke fn bnaya 
    const index = Math.floor(Math.random()*10);// random  index bnaya for array  
    quote.textContent=quotes[index]; // random index ka quote put kia in h1 to display 
})