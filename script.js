
//date

const dayToday = document.querySelector('.dayToday');
const dateToday = document.querySelector('.dateToday')
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const today = new Date();
 
window.addEventListener('DOMContentLoaded',()=>{
    dayToday.textContent = days[today.getDay()]
    const month = today.toLocaleString('default',{month:'long'})
    dateToday.textContent = `${month} ${today.getDate()}, ${today.getFullYear()}`
})


//weather


const apiKeyWeather = process.env.API_KEY
const myTemp = document.querySelector('.temperature')
const weatherCondition = document.querySelector(".condition")

window.addEventListener('DOMContentLoaded',async ()=>{
   navigator.geolocation.getCurrentPosition(gotLocation,declinedLocation)
})

async function getWeatherData(lat,lon){
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}`;
const promise = await fetch(apiUrl);

return await promise.json();
}

async function gotLocation(position){
   const result = await getWeatherData(position.coords.latitude, position.coords.longitude) 
    
    const approve = document.createElement('span');
    const farenhTemp = ((result.main.temp - 273.15) * 9/5 + 32).toFixed(0);
  
   approve.textContent = `${farenhTemp}° F`;
   myTemp.appendChild(approve);

   const cond = document.createElement('img');
   cond.classList.add('iconStyle');

   const outdoorCondition = result.weather[0].id;
   
   
  switch(true){
   
    case(outdoorCondition >= 200 && outdoorCondition < 300):  cond.src = `./icons/thunder.png`;
    
    break;
    case(outdoorCondition >= 300 && outdoorCondition < 500):  cond.src = `./icons/rain.png`;
    
    break;
    case(outdoorCondition >= 500 && outdoorCondition < 600):  cond.src = `./icons/rain.png`;
 
    break;
    case(outdoorCondition >= 600 && outdoorCondition < 700):  cond.src = `./icons/cloudySnow.png`;
    
    break;
    case (outdoorCondition >=700 && outdoorCondition < 800 ):  cond.src = `./icons/mist.png`;
    
    break;
    case(outdoorCondition === 800):  cond.src = `./icons/sunny.png`;
    break;
    default: cond.src = `./icons/cloud.png`;
  
  }
  weatherCondition.appendChild(cond);

}
function declinedLocation(){
        const decline = document.createElement('span');
    
        decline.textContent = `Problem to retrive data`
        myTemp.appendChild(decline)
    }





// To Do list





const todoDiv = document.querySelector(".todo");
const sectionToDo = document.querySelector('.sectionToDo');
function showNotes(){
    sectionToDo.innerHTML = localStorage.getItem('notes')
}
showNotes();
function updateStorage(){
   localStorage.setItem('notes',sectionToDo.innerHTML)
}


   function addFunction(){
    const listDiv = document.createElement('div');
    const list = document.createElement('p');
    const checkBtn = document.createElement('img');
    const delBtn = document.createElement('img');
    checkBtn.classList.add('checkBtn');
   checkBtn.src = './icons/uncheck.png';
   delBtn.src = './icons/delete.png';
    delBtn.classList.add('delBtn');
    list.classList.add('todoList');
    list.setAttribute('contenteditable','true');
    listDiv.classList.add('listSection');
  
    listDiv.appendChild(checkBtn);
    listDiv.appendChild(list);
    listDiv.appendChild(delBtn);
   sectionToDo.appendChild(listDiv);
    todoDiv.appendChild(sectionToDo);
    updateStorage();
   }

   //check button

   const checkButtons = document.querySelectorAll('.checkBtn');
console.log(checkButtons)


//delete note and save <p> input on key up
  
    todoDiv.addEventListener('click',(e)=>{
       if(e.target.classList == "delBtn"){
       e.target.parentElement.remove();
       updateStorage();
       }else if(e.target.classList == 'todoList'){
        e = document.querySelectorAll('.todoList');
       
        e.forEach(element => { element.onkeyup = function(){
            updateStorage();
        }
            
        });
       }
       
    })

    todoDiv.addEventListener('click',(e)=>{
        if(e.target.classList == 'checkBtn'){
            e.target.src = './icons/check.png';
            e.target.classList.add('checked');
            e.target.classList.remove('checkBtn');
            e.target.nextElementSibling.classList.add('todoListCross')
            updateStorage();
        }else if(e.target.classList == 'checked'){
            e.target.src = './icons/uncheck.png';
            e.target.classList.add('checkBtn');
            e.target.classList.remove('checked');
            e.target.nextElementSibling.classList.remove('todoListCross')
            updateStorage();
        }
    })


    // Appointment



    const appBlock = document.querySelector('.appointment');
    
    function getAppointmentData(){
        appBlock.innerHTML = localStorage.getItem('appointments')
    };
  
   getAppointmentData();

    const appSection = appBlock.firstElementChild;
    appSection.classList.add('show')
    console.log(appSection)

    const appBtn = document.querySelector('.addAppoint');

   function appointmentStorage(){
        localStorage.setItem('appointments',appBlock.innerHTML)
    };
  

    
  

    appBtn.addEventListener('click',function(){
     //create appointment div
     const appNoteDiv = document.createElement('div');
     appNoteDiv.classList.add('appDiv');

     const textInput = document.createElement('p');
     textInput.classList.add('input');
     textInput.classList.add('text');
     
     textInput.setAttribute('contenteditable','true');
    

     const section = document.createElement('section');
     section.classList.add('hidden');

     const timeInput = document.createElement('p');
     timeInput.classList.add('input');
    
    


     const dateInput = document.createElement('p');
     dateInput.classList.add('input');
     dateInput.setAttribute('id','timeMatch')
   

     const section2 = document.createElement('section');
     section2.classList.add('show')

     const timeValue = document.createElement('input');
     timeValue.setAttribute('type','time');
     const dateValue = document.createElement('input');
     dateValue.setAttribute('type','date');
     const saveBtn = document.createElement('img');
     saveBtn.classList.add('saved');

     //save button

     saveBtn.onclick = function saveFunction(){

        const parentElem = saveBtn.parentNode;
        const parentSib = parentElem.previousSibling;

        const myTimeValue = saveBtn.previousSibling.previousSibling.value;
       localStorage.setItem('mytime',myTimeValue);

        const myDateValue = saveBtn.previousSibling.value;
        localStorage.setItem('mydate',myDateValue)




       parentSib.firstChild.textContent = myTimeValue;
       parentSib.firstChild.nextSibling.textContent = myDateValue;

       const savedTime = localStorage.getItem('mytime');
       if(savedTime){
        parentSib.firstChild.innerText = savedTime;
        saveBtn.previousSibling.previousSibling.value = savedTime;
    }
 

    const savedDate = localStorage.getItem('mydate');
  
           if(savedDate){
            parentSib.firstChild.nextSibling.innerText = savedDate;
            saveBtn.previousSibling.value = savedDate
           } 

        parentSib.classList.remove('hidden');
        parentSib.classList.add('show');

        parentElem.classList.remove('show')
        parentElem.classList.add('hidden')
        
        appointmentStorage();
     }

    
     saveBtn.src = './icons/save.png'


     const appBtn = document.createElement('img');
     appBtn.classList.add('delBtn');
     appBtn.src = './icons/delete.png'

     //apending

     section.appendChild(timeInput);
     section.appendChild(dateInput);
     section.appendChild(appBtn);

     section2.appendChild(timeValue);
     section2.appendChild(dateValue);
     section2.appendChild(saveBtn);

   


     appNoteDiv.appendChild(textInput);
     appNoteDiv.appendChild(section);
     appNoteDiv.appendChild(section2);


appBlock.appendChild(appNoteDiv);

appointmentStorage();

    })


   
   

appBlock.addEventListener('click',(e)=>{
    
        if(e.target.classList == "delBtn"){
        e.target.parentElement.parentElement.remove();
        appointmentStorage();
        }else if(e.target.classList == 'input'){
         e = document.querySelectorAll('.input');
         
         e.forEach(element => { element.onkeyup = function(){
           appointmentStorage()
         }
             
         });
        }
})

  // Reminder





 window.addEventListener('DOMContentLoaded',function(){

    const reminderDiv = document.querySelector('.myReminder');

    const fullDateFromAppointment = document.querySelectorAll('#timeMatch');

    const yyyy = today.getFullYear();
    
    const mm = ((today.getMonth()) + 1).toString();
    
    
    const dd = (today.getDate()).toString();
    
    const fullDateForReminder = `${yyyy}-${mm.padStart(2,'0')}-${dd.padStart(2,'0')}`;

    
    
    fullDateFromAppointment.forEach(e =>{
   
       
        
        if(e.innerText == fullDateForReminder){
          e.parentElement.parentElement.style.border = '1px solid red'
            reminderDiv.textContent = `Check your appontments list...`;
            reminderDiv.style.color = 'red'
           
         }else{reminderDiv.textContent = `No appointments today...
            Take a break!`};
           
    })

 })


 
