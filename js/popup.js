
class Popup {
   constructor(popupNameClass) {
      this._popupNameClass = popupNameClass;
      this.popup = document.querySelector(`.${this._popupNameClass}`);
      
      this._clickEscKey = this._clickEscKey.bind(this)  // this внутри _clickEscKey это будет всегда наш popup
   }

   _clickEscKey(evt) {
      if(evt.key === 'Escape') {
          this.close() // тут this теряется поэтому в конструкторе сделали bind
      }
  }

   open() {
      this.popup.classList.add('popup_active');
      document.addEventListener('keyup', this._clickEscKey)
   }

   close() {
      this.popup.classList.remove('popup_active');
      document.removeEventListener('keyup', this._clickEscKey)
   }

   setEventListener(){
      this.popup.addEventListener('click', (evt) => {
          if(evt.target.classList.contains(this._popupNameClass) || evt.target.closest('.popup__close')){
              this.close()
          }
      })
  }


}
