const itemsPerPage = 9;
const studentList = document.querySelector('.student-list');
const header = document.querySelector('.header');



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage (list, page){
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;

   studentList.innerHTML = '';

   for(let i = 0; i < list.length; i++){
      if(i >= startIndex && i < endIndex){
         const student = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;
         studentList.insertAdjacentHTML('beforeend', student);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination (list){
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   const linkList = document.querySelector('.link-list');
   
   linkList.innerHTML = '';

   for (let i = 1; i <= numOfPages; i++){
      const buttons = `<li>
         <button type="button">${[i]}</button>
      </li>`;
      linkList.insertAdjacentHTML('beforeend', buttons);
      const firstButton = linkList.querySelector('button');
      firstButton.className = 'active';
   }

   linkList.addEventListener('click', (e) => {
      if(e.target.tagName === 'BUTTON'){
         const activeButton = document.querySelector(".active");
         activeButton.classList.remove('active');
          e.target.classList.add('active');
          showPage(list, e.target.textContent);
      }
    });
}

//search
const searchBar = `<label for="search" class="student-search">
<input id="search" placeholder="Search by name...">
<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;

header.insertAdjacentHTML('beforeend', searchBar);


// Call functions
showPage(data, 1);
addPagination(data);