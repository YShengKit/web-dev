// to check whether the body/docs is loaded
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
    console.log('loading')
}else if(document.readyState == 'interactive'){
    document.addEventListener('DOMContentLoaded',ready)
    console.log(document.readyState)
}else{
    ready()
    console.log('done')
}

// functions that loaded first
function ready(){
    
    var removeCartItemButtons =document.getElementsByClassName('btn-remove')
    console.log(removeCartItemButtons)
    // loop thru every elements (remove btn)
    for (var i=0; i<removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click',removeCartItem)
    }

    // loop thru every elements (quantity btn)
    var quantityInputs = document.getElementsByClassName('cart-increment')
    for (var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('click',qtyIncrease)
    }

    var quantityInputs = document.getElementsByClassName('cart-decrease')
    for (var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('click',qtyDecrease)
    }

    //  (checkout btn)
    document.getElementsByClassName('btn-checkout')[0].addEventListener('click',checkoutClicked)

    updateCartNum()
    
}

// --------------------------------------------------------------------
// retrieve the cart list

var cartList = JSON.parse(sessionStorage.getItem('cart'));

for (var i=0; i<cartList.length; i++){
    var title = cartList[i].TITLE
    var price = cartList[i].PRICE
    var imageSrc = cartList[i].IMGSRC
    var qty = cartList[i].QTY
    console.log(title,price,imageSrc,qty)

    var cartRow = document.createElement('div')
    // adding class (for styling)
    cartRow.classList.add('cart-item-each')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartRowContents=`
    <div class="cart-item ">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <div class="cart-item-price ">${price}</div>
    <div class="cart-quantity ">
        <button class="cart-decrease btn" ><b>-</b></button>
        <div class="cart-quantity-input">${qty}</div>
        <button class="cart-increment btn" ><b>+</b></button>
        
        <button class="btn btn-remove" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML= cartRowContents
    cartItems.append(cartRow)
    updateCartTotal()
    updateCartNum()
}




// remove cart item
function removeCartItem(event){
    var buttonClicked= event.target
    
    // remove in session storage
    var cart = buttonClicked.parentElement.parentElement
    var getName = cart.getElementsByClassName('cart-item-title')[0].innerText
    for (var i=0; i<cartList.length; i++){
        if (cartList[i].TITLE == getName){
            cartList.splice(i,1);
        }
        updateCartTotal()
    }
    sessionStorage.setItem('cart', JSON.stringify(cartList));
    // remove the entire row
    buttonClicked.parentElement.parentElement.remove()
    // update total price
    updateCartTotal()   
    updateCartNum() 
}

// checkout function
function checkoutClicked(){
    if (document.getElementsByClassName('badge')[0].innerText==0){
        alert('Cart list is empty, please proceed to purchase!')
        location.replace('product3.html')
    }else{
        location.replace('payment.html')
        updateCartTotal()
        updateCartNum()
    }
    
}
// cart-item-title
// qty sections
function qtyIncrease(event){
    let input = event.currentTarget
    var cart = input.parentElement.parentElement
    console.log(cart)
    var title = cart.getElementsByClassName('cart-item-title')[0].innerText
    var qtyNum = cart.getElementsByClassName('cart-quantity-input')[0].innerText
    let count = parseFloat(qtyNum)
    count+=1
    cart.getElementsByClassName('cart-quantity-input')[0].innerText =count
    updateCartTotal()
    console.log(title,count)
    updateSStorage(count,title)
}

function qtyDecrease(event){
    let input = event.currentTarget
    var cart = input.parentElement.parentElement
    console.log(cart)
    var title = cart.getElementsByClassName('cart-item-title')[0].innerText
    var qtyNum = cart.getElementsByClassName('cart-quantity-input')[0].innerText
    let count = parseFloat(qtyNum)
    count-=1
    if(isNaN(count)||count<=0){
        count=1
    }
    cart.getElementsByClassName('cart-quantity-input')[0].innerText =count
    updateCartTotal()
    console.log(title,count)
    updateSStorage(count,title)
}



// update total price
function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-item-each')
    var total =0
    for (var i=0; i<cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('RM',''))
        var quantity = quantityElement.innerText
        total += (price*quantity)
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText ='RM'+total
}

// update cart number (nav bar)
function updateCartNum(){
    let cart= JSON.parse(sessionStorage.getItem('cart'))
    let cartLength = cart.length
    document.getElementsByClassName('badge')[0].innerText= cartLength
}

// update session storage
function updateSStorage(count,title){
    // update in sessionStorage
    data = JSON.parse(sessionStorage.getItem('cart'))
    for (var i=0; i<data.length; i++){
        if(data[i].TITLE ==title){
            // console.log(data[i])
            data[i].QTY = count;
            sessionStorage.setItem('cart', JSON.stringify(data));
        }
        
    }
    
}