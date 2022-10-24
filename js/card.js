class Card {
   constructor(data, idTemplateInHTML) {
      this._data = data; // тут элемент массива
      this._idTemplateInHTML = idTemplateInHTML;
   }

   // возвращаем из html ссылку на содержимое шаблона из template
   _getTemplate() {
         // content исп-ся чтобы добраться до внутренностей <template>
         // document.querySelector('#card-template') - нашли нужный template
         // document.querySelector('#card-template').content - вернули #document-fragment (его видно в <template> по F12, вкладка Elements)
         return document.querySelector(this._idTemplateInHTML).content.querySelector('.card');
   }

   // возвращаем сформированную карточку (DOM Node)
   getElement() {
      // из шаблона берем разметку
      this.element = this._getTemplate().cloneNode(true);  // клонируем 
      // ищем нужные селекторы
      const cardTitle = this.element.querySelector('.card__name');
      const cardImg = this.element.querySelector('.card__img');
      const cardId = this.element.querySelector('.card__id');
      // наполняем их значениями
      cardTitle.textContent = this._data.name; // присвоили имя кота из массива
      cardImg.src = this._data.img_link;
      cardId.textContent = 'id записи: '+this._data.id;

      const cardFavorite = this.element.querySelector('.card__like');
      if (!this._data.favourite) {
         cardFavorite.remove();
      }

      return this.element;
   }
}


