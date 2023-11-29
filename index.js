import { menuArray } from "./data.js";

const foodSection = document.getElementById("food-section")

document.addEventListener('click', (e) => {
    console.log(e.target.dataset.id)
})

function addToCart() {
 // create new section with a display prop. if clicked display, else display hidden? ,maybe
 //needs to render after an item is added to the cart

 // add item to order-checkout-container div using js
 // css is done for this section you just need to add correct classNames
}

function removeItem() {
    //remove item from the order list
}

// on button click for complete order pull up a modal for credit card info, create a form for the modal


function renderMenu (menuItems) {
    const menuElements = menuItems.map(item => {
            const menuItemContainer = document.createElement('div') // main container
            menuItemContainer.className = "food-item-container"
            foodSection.appendChild(menuItemContainer)

            const imgFoodItem = document.createElement('p') //img-emoji-section
            imgFoodItem.className = "img-food-item"
            imgFoodItem.textContent = item.emoji
            menuItemContainer.appendChild(imgFoodItem)

            const foodInfoContainer = document.createElement('div') // food info div
            foodInfoContainer.className = "food-info-container"
            menuItemContainer.append(foodInfoContainer)

            const foodItem = document.createElement('p') // food title, append to inner div ^
            foodItem.className = "food-item"
            foodItem.textContent = item.name
            foodInfoContainer.append(foodItem)

            const description = document.createElement('p') // food description
            description.className = "description"
            description.textContent = item.ingredients.join(', ')
            foodInfoContainer.appendChild(description)

            const foodPrice = document.createElement('p') // food price
            foodPrice.className = "price"
            foodPrice.textContent = `$${item.price}`
            foodInfoContainer.appendChild(foodPrice)

            const addBtn = document.createElement('button')  // add btn
            addBtn.className = "addBtn"
            addBtn.textContent = "+"
            addBtn.setAttribute('data-id', item.id) // dataset to grab the id of the event clicked
            menuItemContainer.appendChild(addBtn)

            const hr = document.createElement('hr')
            foodSection.appendChild(hr)

    })
    return menuElements
}

renderMenu(menuArray)
