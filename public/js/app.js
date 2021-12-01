const weatherForm= document.querySelector('form');
const search= document.querySelector('input');
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')
const radioName= document.getElementsByName('unit')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= search.value;
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    for(let i=0;i<radioName.length;i++){
        if(radioName[i].checked){
           var unit= radioName[i].value;
        }
    }
    fetch('/weather?address='+location+'&unit='+unit).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            messageTwo.textContent=''
        }else{
           messageOne.textContent= data.forecast
           messageTwo.textContent= data.location
        }
     
    })
})
})