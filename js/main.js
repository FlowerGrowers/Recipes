
const search = document.querySelector('#search');
const submit = document.querySelector('#submit');
const random = document.querySelector('#random');

const resultHeading = document.getElementById('result-heading');
const meals = document.getElementById('meals');
const singleMeal = document.getElementById('single-meal');

// searchMeal
async function searchMeal(e){
	e.preventDefault();
	// 清空singleMeal
	singleMeal.innerHTML = '';
	// 获取用户输入的值
	const term = search.value;
	
	
	if(term.trim()){
		
	const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
	const data = await res.json();
	
	resultHeading.innerHTML = `
		<h2>
		${term}的查询结果为:
		</h2>
	`;
	
		if(data.meals === null) {
			resultHeading.innerHTML = `
			<p>没有查询到相关食谱</p>
			`
		}else {
			meals.innerHTML = data.meals.map(meal=>`
	<div class='meal'>
		<img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
		<div class="meal-info" data-mealId='${meal.idMeal}'>
			<h3>
				${meal.strMeal}
			</h3>
		</div>
	
	</div>		
			`
			).join('');
		}
	search.value = '';
	}else{
		alert('请输入内容');
	}
}

//addMealToDOM
function addMealToDOM(meal){
	const ingredients = [];
	for(let i=1;i<=20;i++){
		if(meal[`strIngredient${i}`]){
			ingredients.push(
			`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
			
		}else{
			break;
		}
	}
	
	singleMeal.innerHTML = `
	<div class="single-meal">
		<h1>${meal.strMeal}</h1>
		<img src="${meal.strMealThumb}" alt="" />
		<div class="single-meal-info">
			${meal.strCategory ? `
				<p>${meal.strCategory}</p>`:
				''
			}
			
			${meal.strArea ? `
				<p>${meal.strArea}</p>`:
				''
			}
		
		</div>
		<div class="main">
			<p>${meal.strInstructions}</p>
			<h2>Ingredient</h2>
			<ul>
				${ingredients.map(ing=>`
					<li>${ing}</li>
				`).join('')}
			
			</ul>
		</div>
	</div>
	`
	
	console.log(ingredients);
}

// getMealByid()
async function getMealByid(id){
	const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
	const data = await res.json();
	
	
	const meal = data.meals[0];
	console.log(meal);
	addMealToDOM(meal);
}


// getRandomMeal
async function getRandomMeal(){
	meals.innerHTML = '';
	resultHeading.innerHTML ='';
	const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
	const data = await res.json();
	
	addMealToDOM(data.meals[0]);
	
}


// 事件submit监听
submit.addEventListener('submit',searchMeal);

meals.addEventListener('click',e=>{
	const mealID = e.target.dataset.mealid;
	console.log(mealID);
	getMealByid(mealID);
});

random.addEventListener('click',getRandomMeal);
