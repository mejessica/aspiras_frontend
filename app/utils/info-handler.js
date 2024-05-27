export function displayInfo(mensagem, color){
const small = document.querySelector('small')
small.innerText = mensagem;
small.classList.add(color);

setTimeout(() => {
  small.innerText = '';
}, 4000);
}

