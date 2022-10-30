import { Card } from "./card.js";
import { api } from "./api.js";
import { Popup } from "./popup.js";

const cardsWrapper = document.querySelector('.cards');
const btnPopupAdd = document.querySelector('#add');
const btnPopupLogin = document.querySelector('#login');
const formAdd = document.querySelector('#popup__form-all');
const formLogin = document.querySelector('#popup__form-login');
const popupAdd = new Popup('popup-add');
const popupLogin = new Popup('popup-login');
const removeLocalStorage = document.querySelector('#removeItemLocalStorage');

popupAdd.setEventListener();
popupLogin.setEventListener();

removeLocalStorage.addEventListener('click', funRemoveLocalStorage);

function funRemoveLocalStorage(){
   localStorage.removeItem('cats');
   alert('Очищено от cats!');
}

// собираем данные формы
function dataForm(data){
   // document.cookie = 'email=fwork@ngs.ru;samesite=strict;max-age=360;'; // создали куку
   // Cookies.set('email', 'fwork@ngs.ru') // создали куку через библиотеку
   // Cookies.set('email'); // удаление куки
   //console.log(Cookies.get('email')); // вывести значение куки по имени. Вернет fwork@ngs.ru
   const elements = {};
   data.forEach(input => {
      if (input.type === 'submit') return;  // если кнопка, то её пропускаем
      if(input.type === 'checkbox') {
         elements[input.name] = input.checked;
      }
      if(input.type !== 'checkbox') {
         elements[input.name] = input.value; // input.name - значение атрибута name у элементов формы
      }
   })
   console.log(elements);
   return elements;
}



function createCat(yourData) {
         // передаем данные из формы и шаблон куда их подставить потом
         const card = new Card(yourData, '#card-template'); // создаем карточку
         const newCard = card.getElement(); // вернули её разметку, т.е. this.Element
         cardsWrapper.append(newCard); // добавляем карточку на страницу сайта в нашу разметку (в .cards) созданную дом-ноду
}


// форма добавления котенка
function fromFormToHtml(event) {
   event.preventDefault();
   const allElementsFromForm = [...formAdd.elements]; // [...sjdfkjsdfksd] преобразует явно в тип МАССИВ
   const dataFromForm = dataForm(allElementsFromForm); // записали данные в dataFromForm

   api.addNewCat(dataFromForm).then(()=>{
         // любые работы с DOM мы выполняем внутри ответа сервера, т.е. внутри then
         console.log('fffffffffffffffffffffff');
         createCat(dataFromForm); 
         updateLocalStorage(dataFromForm, {type: 'add-cat'});
         popupAdd.close(); // закрываем попап
      })
}

// форма логина
function fromFormToHtmlLogin(event) {
   event.preventDefault();
   const allElementsFromForm = [...formLogin.elements]; // [...sjdfkjsdfksd] преобразует явно в тип МАССИВ
   const dataFromForm = dataForm(allElementsFromForm); // записали данные в dataFromForm
   Cookies.set('email', `email=${dataFromForm.email}`);
   popupLogin.close();
}

function updateLocalStorage(data, action) {
   const oldLocalStorage = JSON.parse( localStorage.getItem('cats') );
   switch (action.type) {
      case 'add-cat':
         oldLocalStorage.push(data);
         localStorage.setItem('cats', JSON.stringify(oldLocalStorage))
         return;
      case 'all-cat':
         localStorage.setItem('cats', JSON.stringify(data))
         return;  
      case 'delete-cat':
         const newLocalStorage = oldLocalStorage.filter(cat => cat.id !== data.id);
         localStorage.setItem('cats', JSON.stringify(newLocalStorage))
         return;        
      default:
         break;
   }
}

// подключим лок.хранилище. Если нет в лок.хранилище данных, то будет запрос на сервер всех котят
function workLocalStorage() {
   const localData = JSON.parse(localStorage.getItem('cats'));
   // const timeRefr = localStorage.getItem('refreshFromServerCats');

   if (localData && localData.length) {
      console.log('iz loc');
      localData.forEach(function(oneCat) 
      {
         createCat(oneCat);
      })
      alert('Данные по котятам из локального хранилища');
   }
   else {
      console.log('no');
      api.getAllCats()
      .then( ({data})=>{
         // {data} - деструктурировали нужный ключ, т.е. получили только нужное нам поле data
         // сервер ответил данными и вывод 
         data.forEach(function(oneCat) {
            createCat(oneCat);
         })
         // localStorage.setItem('cats', JSON.stringify(data));
         updateLocalStorage(data, {type: 'all-cat'});
         alert('Данные по котятам с сервера');
    })
   }
}

workLocalStorage()





// по клику на кнопку Add вызовем наш popup
// если написать просто popupAdd.open(), то this будет - наша кнопка btnPopupAdd, поэтому вызываем метод через стрелочную ф-ию
btnPopupAdd.addEventListener('click', ()=>popupAdd.open())

// submite на форму. По enter на поле ввода сработает типа мы нажали btn
formAdd.addEventListener('submit', fromFormToHtml);


btnPopupLogin.addEventListener('click', ()=>popupLogin.open())
formLogin.addEventListener('submit', fromFormToHtmlLogin);

const booleanLogin = Cookies.get('email');
if (!booleanLogin) {
   popupLogin.open();
   btnPopupAdd.classList.add('visually-hidden');
}