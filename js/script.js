const itemsPerPage = 9;
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');

/*
   Dynamically adds search bar in header of page
*/
const header = document.querySelector('.header');

const searchBar = `<label for="search" class="student-search">
<input id="search" placeholder="Search by name...">
<button type="submit" id="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;

header.insertAdjacentHTML('beforeend', searchBar);


/*
   Displays list of students resticted to nine students per page
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
   Displays pagination buttons
*/
function addPagination (list){
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   
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

/*
   Search functionality
*/
const search = document.querySelector('#search');
const submit = document.querySelector('#submit');
const alert = document.createElement('P');
alert.innerHTML = "No results found";


//Filters the students based on user input
function searchList (searchInput, list){
   const inputValue = searchInput.value.toLowerCase();
   const results = [];
   

   for(let i = 0; i < list.length; i++){
     let result = list[i];
     if (result.name.first.toLowerCase().indexOf(inputValue) !== -1
         || result.name.last.toLowerCase().indexOf(inputValue) !== -1) {
         results.push(result);
      }
   }

   if(results !== 0){
      showPage(results, 1);
      addPagination(results);

   }else{
      studentList.appendChild(alert);
   }  
 }
  

//Event handler to call search results on clicking button in search bar
submit.addEventListener('click', (e) => {
   e.preventDefault();
   searchList(search, data);
 });
 

//Event handler to call search results on typing in search bar input field 
 search.addEventListener('keyup', () => {
   searchList(search, data);
 });


// Call functions
showPage(data, 1);
addPagination(data);