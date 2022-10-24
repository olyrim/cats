const cardsWrapper = document.querySelector('.cards');
const btnPopupAdd = document.querySelector('#add');
const formAdd = document.querySelector('#popup__form-all');
const popupAdd = new Popup('popup-add');

popupAdd.setEventListener();



// собираем данные формы
function dataForm(data){
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



function fromFormToHtml(event) {
   event.preventDefault();
   const allElementsFromForm = [...formAdd.elements]; // [...sjdfkjsdfksd] преобразует явно в тип МАССИВ
   const dataFromForm = dataForm(allElementsFromForm);

   // передаем данные из формы и шаблон куда их подставить потом
   const card = new Card(dataFromForm, '#card-template');
   const newCard = card.getElement(); // вернули this.Element
   cardsWrapper.append(newCard); // добавляем в нашу разметку (в .cards) созданную дом-ноду

   popupAdd.close(); // закрываем попап
}

// вывод 
cats.forEach(function(oneCat) {
   const card = new Card(oneCat, '#card-template');
   const newCard = card.getElement(); // вернули this.Element
   cardsWrapper.append(newCard); // добавляем в нашу разметку (в .cards) созданную дом-ноду
});


// по клику на кнопку Add вызовем наш popup
// если написать просто popupAdd.open(), то this будет - наша кнопка btnPopupAdd, поэтому вызываем метод через стрелочную ф-ию
btnPopupAdd.addEventListener('click', ()=>popupAdd.open())

// submite на форму. По enter на поле ввода сработает типа мы нажали btn
formAdd.addEventListener('submit', fromFormToHtml);

