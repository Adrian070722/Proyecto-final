document.addEventListener('DOMContentLoaded', ()=>{
    async function saveFaqs(event) {
        event.preventDefault();
        var faqsId = document.getElementsByClassName("_id")[0];
        var faqsName = document.getElementsByClassName("nameInput")[0];
        var faqsText = document.getElementsByClassName("descriptionInput")[0];
       
  
        try {
          if (faqsId.value == "") {
            var response = await fetch('/api/create/faqs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: faqsName.value, description: faqsText.value })
            });
          } else {
            var response = await fetch(`/api/update/faqs/${faqsId.value}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({  title: faqsName.value, description: faqsText.value })
          });
          }
  
            if (response.ok) {
                faqsName.value = '';
                faqsText.value = '';
                
                fetchAndDisplayCards();
            } else {
                console.error('Error creating faqs:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating faqs:', error);
        }
      }

      document.getElementById("Guardar").addEventListener("click", saveFaqs);
      const cardContainer = document.getElementById('faqs-list');  
      function createCard(data) {
        const card = document.createElement('div');
        card.className = 'overflow-y-auto w-[22%] mx-auto';
        card.innerHTML = `
              <div class="p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      
                      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">${data.title}</h3>
                        <div class="mt-2">
                          <p class="text-sm text-gray-500">${data.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto openModal" value="${data._id}">Editar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto deleteButton" value="${data._id}">Eliminar</button>
                  </div>
                </div>
              </div>
        ` ;
        return card;

    }  
     async function fetchAndDisplayCards() {
        try {
            const response = await fetch('/api/get/faqs');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            cardContainer.innerHTML = "";
            data.forEach(item => {
                const card = createCard(item);
                cardContainer.appendChild(card);
                setButtons(data);
            });
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
      fetchAndDisplayCards();
      async function deleteFaqs(faqsId) {
        try {
            const response = await fetch(`/api/delete/faqs/${faqsId}`, {
                method: 'DELETE'
            });
  
            if (response.ok) {
              fetchAndDisplayCards();
            } else {
                console.error('Error deleting faqs:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting faqs:', error);
        }
    }
    function setButtons(data) {
        const deleteButtons = document.getElementsByClassName('deleteButton');
        const openModalButtons = document.getElementsByClassName('openModal');
        const form = document.getElementById('task-form');
for (var i=0; i< openModalButtons.length; i++) {
          openModalButtons[i].addEventListener("click", (e) => {
             var faqsdata = data.find(item => item._id == e.target.value);
             form.getElementsByClassName("_id")[0].value = faqsdata._id
             form.getElementsByClassName("nameInput")[0].value = faqsdata.title
             form.getElementsByClassName("descriptionInput")[0].value = faqsdata.description
          });
      }

        for (var i=0; i< deleteButtons.length; i++) {
          deleteButtons[i].addEventListener("click", (e) => {
             deleteFaqs(e.target.value);
          });
        }

    }
});