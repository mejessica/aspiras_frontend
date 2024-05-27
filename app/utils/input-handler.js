export function inputError(event){
    if(!event.target.value){
        event.target.classList.add('input-border-danger');
      }else{
        event.target.classList.remove('input-border-danger');
      }
}