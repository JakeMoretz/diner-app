import { menuArray } from './data.js';

const foodSection = document.getElementById('food-section');
const orderCheckoutSection = document.querySelector('.order-checkout-section');
const completeOrderBtn = document.querySelector('.order-btn')
const modalCloseBtn = document.querySelector('.modal-close')

orderCheckoutSection.classList.add('hidden');

let totalOrderPrice = 0;

document.addEventListener('click', (e) => {
    if (e.target.dataset.id) {
        const foodId = parseInt(e.target.dataset.id);
        addToCart(foodId);
        orderCheckoutSection.classList.remove('hidden');
    }

    if (e.target.dataset.remove) {
        removeFoodItem(e);
    }
});


// completeOrderBtn.addEventListener("click", () => {
//     const formContainer = document.querySelector('.form-container')
//     const addBtn = document.getElementsByClassName('addBtn')
//     addBtn.disabled = true
//     formContainer.classList.add('form-block')
// })

// modalCloseBtn.addEventListener("click", () => {
//     const formContainer = document.querySelector('.form-container')
//     formContainer.classList.remove('form-block')
// })

function addToCart(foodId) {
    const selectedFood = menuArray.find((food) => food.id === foodId);
    const orderCheckoutContainer = document.querySelector(
        '.order-checkout-container'
    );

    if (selectedFood) {
        const topCheckoutSection = document.createElement('div');
        topCheckoutSection.className = 'top-checkout-section';
        topCheckoutSection.setAttribute('data-foodDiv', selectedFood.id);

        const foodItem = document.createElement('p');
        foodItem.className = 'item';
        foodItem.textContent = selectedFood.name;

        const removeBtn = document.createElement('span');
        removeBtn.className = 'item-remove';
        removeBtn.setAttribute('data-remove', selectedFood.id);
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

function removeFoodItem(e) {
    const foodIdToRemove = parseInt(e.target.dataset.remove);

    // Find the corresponding checkout section based on the data-foodDiv attribute
    const checkoutSectionToRemove = document.querySelector(
        `.top-checkout-section[data-foodDiv="${foodIdToRemove}"]`
    );

    if (checkoutSectionToRemove) {
        // subtract the removed item from the total price
        const selectedFood = menuArray.find(
            (food) => food.id === foodIdToRemove
        );
        totalOrderPrice -= selectedFood.price;

        // Update the total price display
        const totalPrice = document.querySelector(
            '.bottom-checkout-section .price'
        );
        totalPrice.textContent = `$${totalOrderPrice}`;

        // Remove the checkout section
        checkoutSectionToRemove.remove();

        if (totalOrderPrice === 0) {
            orderCheckoutSection.classList.add('hidden');
        }
    }
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
