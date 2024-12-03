//маска для телефона
export function maskTel() {
    window.addEventListener("DOMContentLoaded", function() {
        [].forEach.call( document.querySelectorAll('.tel'), function(input) {
          var keyCode;
          function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
              this.value = new_value;
            }
            if (event.type == "blur" && this.value.length < 5) {
              this.value = "";
            }
          }
      
          input.addEventListener("input", mask, false);
          input.addEventListener("focus", mask, false);
          input.addEventListener("blur", mask, false);
          input.addEventListener("keydown", mask, false);
      
        });
      
      });
}
//добавление класса для родительского элемента
export function toggleActiveClassParent(elements) {
    elements.forEach(function(element) {
      element.addEventListener('click', function() {
        elements.forEach(function(el) {
          if (el !== element) {
            el.parentElement.classList.remove('_active');
          }
        });
        element.parentElement.classList.toggle('_active');
      });
    });
}
//добавление класса для  элементу
export  function toggleActiveClass(elements) {
  elements.forEach(function(element) {
    element.addEventListener('click', function() {
      elements.forEach(function(el) {
        if (el !== element) {
          el.classList.remove('_active')
        }
      });
      element.classList.toggle('_active');
    });
  });
}
//убрать меню при клики на ссылки меню
export function toggleLinkMenuNoOpen() {
    const menuLinkAll = document.querySelectorAll('.menu__link');
    if(menuLinkAll.length > 0) {
        menuLinkAll.forEach(link => {
        link.addEventListener('click', () => {
        document.documentElement.classList.remove('menu-open');
        document.documentElement.classList.remove('lock');
        })
    });
    }
}
// убираем меню если клик вне меню
export function toggleOutClickMenuRemoveOpen() {
  const menuOpen = document.querySelectorAll('.your-menu');
  document.addEventListener('click', function(event) {
    if (document.documentElement.classList.contains('menu-open')) {
      let clickOutsideMenu = true;
      
      menuOpen.forEach(function(menu) {
        if (menu.contains(event.target)) {
          clickOutsideMenu = false;
        }
      });

      if (clickOutsideMenu) {
        document.documentElement.classList.remove('menu-open');
        document.body.classList.remove('lock');
      }
    }
  });
}


//закрытие при клике вне элемента
export function removeClassOutClickElement(elements, removeClass) {
    
    document.addEventListener('click', function(event) {
      // Перебираем все элементы из массива
      elements.forEach(function(element) {
        if (!element.contains(event.target)) {
          // Удаляем класс 'removeClass'
          element.classList.remove(removeClass);
          element.parentElement.classList.remove(removeClass);
          // document.body.classList.remove('lock')
        }
      });
    });
}





  