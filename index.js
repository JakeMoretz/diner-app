import { menuArray } from './data.js';

const foodSection = document.getElementById('food-section');
const orderCheckoutSection = document.querySelector('.order-checkout-section');
const completeOrderBtn = document.querySelector('.order-btn');
const modalCloseBtn = document.querySelector('.modal-close');
const payBtn = document.querySelector('.pay-btn');

let userInput = document.getElementById('user-name');
let userCardNumber = document.getElementById('card-number');
let userCvv = document.getElementById('cvv');

orderCheckoutSection.classList.add('hidden');

let totalOrderPrice = 0;
let timeoutId;

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

completeOrderBtn.addEventListener('click', () => {
    const formContainer = document.querySelector('.form-container');
    const addBtn = document.querySelectorAll('.addBtn');
    const itemRemove = document.querySelectorAll('.item-remove');

    addBtn.forEach((add) => {
        add.classList.add('addBtnDisabled');
    });

    itemRemove.forEach((item) => {
        item.classList.add('item-remove-disabled');
    });

    formContainer.classList.add('form-block');
});

modalCloseBtn.addEventListener('click', () => {
    const formContainer = document.querySelector('.form-container');
    const addBtn = document.querySelectorAll('.addBtn');
    const itemRemove = document.querySelectorAll('.item-remove');

    addBtn.forEach((add) => {
        add.classList.remove('addBtnDisabled');
    });

    itemRemove.forEach((item) => {
        item.classList.remove('item-remove-disabled');
    });

    formContainer.classList.remove('form-block');
});

payBtn.addEventListener('click', () => {
    formValidation();
    const addBtn = document.querySelectorAll('.addBtn');
    const itemRemove = document.querySelectorAll('.item-remove');

    addBtn.forEach((add) => {
        add.classList.remove('addBtnDisabled');
    });

    itemRemove.forEach((item) => {
        item.classList.remove('item-remove-disabled');
    });

    clearTimeout(timeoutId);

    timeoutId = setTimeout(removeOrderConfirm, 3000);
});

function formValidation() {
    const userInput = document.getElementById('user-name');
    const userCardNumber = document.getElementById('card-number');
    const userCvv = document.getElementById('cvv');
    const errorMsg = document.querySelector('.error-msg');

    if (userInput.value === '') {
        userInput.style.border = '1px solid red';
        errorMsg.textContent = 'Enter name on card';
        return;
    } else {
        userInput.style.border = ' 1px solid rgb(0, 0, 0, 0.3)';
        errorMsg.textContent = '';
    }

    if (userCardNumber.value.length === 16) {
        userCardNumber.style.border = ' 1px solid rgb(0, 0, 0, 0.3)';
        errorMsg.textContent = '';
    } else {
        userCardNumber.style.border = '1px solid red';
        errorMsg.textContent = 'Enter card number';
        return;
    }

    if (userCvv.value.length === 3) {
        userCvv.style.border = ' 1px solid rgb(0, 0, 0, 0.3)';
        errorMsg.textContent = '';
    } else {
        userCvv.style.border = '1px solid red';
        errorMsg.textContent = 'Enter card cvv number';
        return;
    }

    const formContainer = document.querySelector('.form-container');

    formContainer.classList.remove('form-block');
    orderCheckoutSection.classList.add('hidden');

    orderConfirm();
    enableButtons();
    resetOrderSection();
}

function resetOrderSection() {
    const topCheckoutSection = document.querySelectorAll(
        '.top-checkout-section'
    );
    const totalPrice = document.querySelector(
        '.bottom-checkout-section .price'
    );

    topCheckoutSection.forEach((section) => {
        section.remove();
    });

    totalOrderPrice = 0;
    userInput.value = '';
    userCardNumber.value = '';
    userCvv.value = '';
}

function enableButtons() {
    const addBtn = document.querySelectorAll('.addBtn');
    addBtn.forEach((add) => {
        add.disabled = false;
    });
}

function orderConfirm() {
    const appContainer = document.querySelector('.app-container');
    const orderConfirm = document.createElement('div');
    const orderText = document.createElement('p');
    const userInput = document.getElementById('user-name');

    orderConfirm.className = 'order-confirm';
    orderText.textContent = `Thanks ${userInput.value}, Your order is on the way`;

    orderConfirm.appendChild(orderText);

    appContainer.appendChild(orderConfirm);
}

function removeOrderConfirm() {
    const orderConfirm = document.querySelector('.order-confirm');
    if (orderConfirm) {
        orderConfirm.remove();
    }
}

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

        const addBtn = document.createElement('img'); // add btn
        addBtn.className = 'addBtn';
        // addBtn.textContent = '+';
        addBtn.src = './images/add.png';

        addBtn.setAttribute('data-id', item.id); // dataset to grab the id of the event clicked
        menuItemContainer.appendChild(addBtn);

        const hr = document.createElement('hr');
        foodSection.appendChild(menuItemContainer);
    });
    return menuElements;
}

renderMenu(menuArray);
