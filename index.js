const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
const orderLists = document.querySelector("[data-order-lists]")
const alphaPos = new AlphaPos()


// AlphaPos Constructor Function
function AlphaPos() { }
AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`input[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}
AlphaPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
  <div class="card mb-3">
    <div class="card-body pt-3 pr-3">
      <div class="text-right">
        <span data-alpha-pos="delete-drink">×</span>
      </div>
      <h6 class="card-title mb-1">${drink.name}</h6>
      <div class="card-text">${drink.ice}</div>
      <div class="card-text">${drink.sugar}</div>
    </div>
    <div class="card-footer text-right py-2">
      <div class="card-text text-muted">$ 
        <span data-drink-price>${drink.price()}</span>
      </div>
    </div>
  </div>
  `
  orderLists.insertAdjacentHTML("afterbegin", orderListsCard)
}
AlphaPos.prototype.deleteDrink = function (target) {
  target.remove()
}
AlphaPos.prototype.checkout = function () {
  let totalAmount = 0
  document.querySelectorAll('span[data-drink-price]').forEach(item => {
    totalAmount += Number(item.textContent)
  })
  return totalAmount
}
AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll(".card").forEach(card => {
    card.remove()
  })

}

// Drink Constructor function
function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}
Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}

// 新增單項飲料訂單
addDrinkButton.addEventListener('click', function () {
  // 1. 取出店員選擇的飲料品項、甜度、冰塊選項內容
  const drinkName = alphaPos.getCheckedValue("drink")
  const ice = alphaPos.getCheckedValue("ice")
  const sugar = alphaPos.getCheckedValue("sugar")

  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert("Please choose at least one item.")
    return
  }

  // 3. 建立飲料實例，並取得飲料價格
  const drink = new Drink(drinkName, sugar, ice)

  // 4. 將飲料實例產生成左側訂單區的畫面
  alphaPos.addDrink(drink)
})

// 刪除單項飲料訂單
orderLists.addEventListener("click", function (event) {
  if (event.target.matches('span[data-alpha-pos="delete-drink"]')) {
    alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
  } else {
    return
  }
})

// 完成結帳，顯示款項總額，並清空所有訂單
orderLists.addEventListener("click", function (event) {
  if (event.target.matches('button[data-alpha-pos="checkout"]')) {
    // 顯示總額
    let totalAmount = alphaPos.checkout()
    alert(`Total amount of drinks：$${totalAmount}`)

    // 清空所有訂單
    alphaPos.clearOrder(orderLists)
  }
})




// 我改的，生成飲料列表
const sectionMenu = document.querySelector("section[class='menu mb-4']")
const drinkList = ["Black Tea", "Oolong Tea", "Baozong Tea", "Green Tea", "Bubble Milk Tea", "Black Tea Latte", "Lemon Green Tea", "Matcha Latte"]

function displayDrinks() {
  let innerHTML = `<div class="card-deck mb-3">`
  for (let i = 0; i < 4; i++) {
    innerHTML += `
    <div class="card text-center">
      <label class="card-body px-2">
        <h5 class="card-title">${drinkList[i]}</h5>
        <input type="radio" name="drink" value="${drinkList[i]}">
      </label>
    </div>
    `
  }
  innerHTML += `
  </div>
  <div class="card-deck">
  `
  for (let i = 4; i < 8; i++) {
    innerHTML += `
    <div class="card text-center">
      <label class="card-body px-2">
        <h5 class="card-title">${drinkList[i]}</h5>
        <input type="radio" name="drink" value="${drinkList[i]}">
      </label>
    </div>
    `
  }
  innerHTML += `</div>`

  sectionMenu.innerHTML = innerHTML
}
displayDrinks()

