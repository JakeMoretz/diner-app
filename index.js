import { menuArray } from './data.js';

const foodSection = document.getElementById('food-section');


document.addEventListener('click', (e) => {
    if (e.target.dataset.id) {
        const foodId = parseInt(e.target.dataset.id);
        addToCart(foodId);
    }
    if(e.target.dataset.remove) {
        console.log('clicked')
        console.log(e.target)
        removeFoodItem()
        
    }
});


function addToCart(foodId) {
    const selectedFood = menuArray.find((food) => food.id === foodId);
    const orderCheckoutContainer = document.querySelector(
        '.order-checkout-container'
    );

    if (selectedFood) {
        const topCheckoutSection = document.createElement('div');
        topCheckoutSection.className = 'top-checkout-section';

        const foodItem = document.createElement('p');
        foodItem.className = 'item';
        foodItem.textContent = selectedFood.name;

        const removeBtn = document.createElement('span');
        removeBtn.className = 'item-remove';
        removeBtn.setAttribute('data-remove', selectedFood)
        removeBtn.textContent = 'remove';

        const itemPrice = document.createElement('p');
        itemPrice.className = 'item-price';
        itemPrice.textContent = `$${selectedFood.price}`;

        foodItem.appendChild(removeBtn);
        topCheckoutSection.appendChild(foodItem);
        topCheckoutSection.appendChild(itemPrice);

        orderCheckoutContainer.appendChild(topCheckoutSection);

        renderTotalPrice(foodId);

    }
}

let totalOrderPrice = 0;

function renderTotalPrice(foodId) {
    const selectedFood = menuArray.find((food) => food.id === foodId);
    const totalPrice = document.querySelector(
        '.bottom-checkout-section .price'
    );

    totalOrderPrice += selectedFood.price;

    if (selectedFood) {
        totalPrice.textContent = `$${totalOrderPrice}`;
    }
}

function removeFoodItem() {
    const orderCheckoutContainer = document.querySelector('.order-checkout-container')
    const topCheckoutSection = document.querySelector('top-checkout-section')

    topCheckoutSection.innerHTML = ""

}

function renderMenu(menuItems) {
    const menuElements = menuItems.map((item) => {
        const menuItemContainer = document.createElement('div'); // main container
        menuItemContainer.className = 'food-item-container';
        foodSection.appendChild(menuItemContainer);

        const imgFoodItem = document.createElement('p'); //img-emoji-section
        imgFoodItem.className = 'img-food-item';
        imgFoodItem.textContent = item.emoji;
        menuItemContainer.appendChild(imgFoodItem);

        const foodInfoContainer = document.createElement('div'); // food info div
        foodInfoContainer.className = 'food-info-container';
        menuItemContainer.append(foodInfoContainer);

        const foodItem = document.createElement('p'); // food title, append to inner div ^
        foodItem.className = 'food-item';
        foodItem.textContent = item.name;
        foodInfoContainer.append(foodItem);

        const description = document.createElement('p'); // food description
        description.className = 'description';
        description.textContent = item.ingredients.join(', ');
        foodInfoContainer.appendChild(description);

        const foodPrice = document.createElement('p'); // food price
        foodPrice.className = 'price';
        foodPrice.textContent = `$${item.price}`;
        foodInfoContainer.appendChild(foodPrice);

        const addBtn = document.createElement('button'); // add btn
        addBtn.className = 'addBtn';
        addBtn.textContent = '+';
        addBtn.setAttribute('data-id', item.id); // dataset to grab the id of the event clicked
        menuItemContainer.appendChild(addBtn);

        const hr = document.createElement('hr');
        foodSection.appendChild(hr);
    });
    return menuElements;
}

renderMenu(menuArray);
