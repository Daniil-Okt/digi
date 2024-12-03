// Функция отправки в яндекс метрику цели на отправку формы (расскоментировать для использования)
// function sendingYandexMetrika() {
//   yaCounter94592071.reachGoal('form')
// }
export function validForm(form, popupTranks) {
    const url = 'static/send.php'
    document.addEventListener('DOMContentLoaded', () => {
        form.addEventListener('submit', formSend)
    
        // функция обработки формы
        async function formSend(e) { 
          e.preventDefault()
      
          let error = formValidate(form)
      
          let formData = new FormData(form)
      
            if (error === 0) {
            //   отправка полученных данных с формы в файл php
                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                  if (response.ok) {
                    // Обработка успешной отправки формы
                    console.log('Form was submitted successfully!');
                    popupTranks.classList.add('_is-open')
                    form.reset()
                    // sendingYandexMetrika()   
                  } else {
                    // Обработка ошибок отправки формы
                    console.log('An error occurred while submitting the form.');
                  }
                })
                .catch(error => {
                  console.log('An error occurred while submitting the form:', error);
                });
                
            }
        }
        const inputFormRecord = form.querySelectorAll('._req') 
        if (inputFormRecord.length > 0) {
          inputFormRecord.forEach(input => {
            input.addEventListener('input', function() {
              if (input.value.length > 0) {
                    formRemoveError(input);
              }
          });
          });
        }
        function formValidate(popup) {
          let error = 0;
          // технический класс который нужно добавиь на те инпуты которые нужно проверять
          let formReq = form.querySelectorAll('._req')
          for (let index = 0; index < formReq.length; index++) {
              const input = formReq[index];
              //вначале убираем класс error с инпута
              formRemoveError(input)
      
              //проверка инпуста с email, нужно добавить класс к инпуту
      
              if (input.classList.contains('_email')) {
                  //проверка или email соответствует
                  if (emailTest(input)) {
                      //если проверка не прохожит до добавляетм класс ошибки
                      formAddError(input)
                      error++
                  }
                      //проверяем или является чек боксом
                      //проверка что это чекбок       проверка что этот чекбокс не влючен
                  } else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
                      //добавляем к нему класс ошибки 
                      formAddError(input)
                      error++
                  } else if(input.getAttribute("type") === "tel") {
                    //добавляем к нему класс ошибки 
                    if(telTest(input)) {
                      formAddError(input)
                      error++
                    }
                  }
                   else if (input.value === '' && input.value < 2) {
                  //проверка всех остальных инпутов заполнены они или нет
                      formAddError(input)
                      error++
                  }
              }
              return error
          }
      
      
      //функции добавление и удаление класса ошибки
      function formAddError(input) {
          input.parentElement.classList.add('_error')
          input.classList.add('_error')
      }
      function formRemoveError(input) {
          input.parentElement.classList.remove('_error')
          input.classList.remove('_error')
      }
      function emailTest(input) {
      return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(input. value);
      }
      function telTest(input) {
        return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input. value);
      }
      })
}

