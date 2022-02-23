document.getElementById("search-btn").addEventListener("click", () => {
    const searchInput = document.getElementById("input-feild");
    const writeSomethingContainer = document.getElementById("write-messege");
    // const div = document.createElement("div");
    const searchText = searchInput.value;
    searchInput.value = "";

    if (searchText == "") {
        writeSomethingContainer.innerHTML = `
        <div class="toast show end-0 position-absolute align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            Please Write Somethnig
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
        `;
        // writeSomethingContainer.appendChild(div)
    } else {
        // get the dynamic api url
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        writeSomethingContainer.textContent = "";
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data));
    }
    
});


// search foods
const displayData = foods => {
    const cardContainer = document.getElementById("card-container");
    const noResult = document.getElementById("no-result");
    const meals = foods.meals;
    cardContainer.textContent = "";
    if (foods.meals == null) {
        noResult.classList.remove("d-none");
        noResult.classList.add("d-block");
        document.getElementById("details-container").textContent = "";
    } else {
        meals.forEach( meal => {
            const div = document.createElement("div");
            div.innerHTML = `
            <div onclick="loadMealDetails(${meal.idMeal})" class="col">
                <div class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="img">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <p title="${meal.strInstructions}" class="card-text card-text2">
                      ${meal.strInstructions.slice(0, 120)}
                      </p>
                    </div> 
                </div>
            </div>
            `;
            cardContainer.appendChild(div);
            noResult.classList.add("d-none");
            // console.log(meal);
        });
    }
    
};


const loadMealDetails = (mealId) => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data));
};



const displayMealDetails = (meal) =>{
    const singleMeal = meal.meals[0];
    console.log(singleMeal);
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.textContent = "";
    const div = document.createElement("div");
    div.className = "card mb-3";
    div.innerHTML = `
    <div class="row g-0">
        <div class="col-md-5">
            <img src="${singleMeal.strMealThumb}" class="img-fluid rounded-start" alt="img-details">
        </div>
        <div class="col-md-7">
            <div class="card-body">
                <h5 class="card-title">${singleMeal.strMeal}</h5>
                <p class="card-text">${singleMeal.strInstructions}</p>
                <p class="card-text">
                    <small class="text-muted">
                        <a class="text-muted" target="_blank" href="${singleMeal.strYoutube}">See Video</a>
                    </small>
                </p>
            </div>  
        </div>
    </div>
    `;
     detailsContainer.appendChild(div);    
}