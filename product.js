// to check whether the body/docs is loaded
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

// functions that loaded first
function ready(){
    // loop thru every elements (add to cart btn)
    var addTocartButtons= document.getElementsByClassName('btn-addToCart')
    for (var i=0; i<addTocartButtons.length;i++){
        var button = addTocartButtons[i]
        button.addEventListener('click',addToCartClicked)
    }

    updateCartNum()
}
// --------------------------------------------------------------
// specific functions

// Add to cart (fetching all elements)
function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var toImg = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product-name')[0].innerText
    var price = shopItem.getElementsByClassName('product-price')[0].innerText
    var imageSrc = toImg.getElementsByClassName('main-img')[0].src
    var qty = shopItem.getElementsByClassName('qty-input')[0].innerText
    addObject(button,title)
}

// add obj to session storage
function addObject(button,title){
    // session storage obj
    var newCart = new Object();
    var shopItem = button.parentElement.parentElement
    var toImg = button.parentElement.parentElement.parentElement
    newCart.TITLE = shopItem.getElementsByClassName('product-name')[0].innerText;
    newCart.PRICE = shopItem.getElementsByClassName('product-price')[0].innerText;
    newCart.IMGSRC = toImg.getElementsByClassName('main-img')[0].src;
    newCart.QTY = shopItem.getElementsByClassName('qty-input')[0].innerText;
    if(sessionStorage.cart){
        cart= JSON.parse(sessionStorage.getItem('cart'));
    }else{
        cart=[];
    }

    for (var i=0; i<cart.length; i++){
        if (cart[i].TITLE==title){
            console.log('repeated')
            alert('This item is already added to the cart')
            return
        }
    }
    cart.push(newCart )
    sessionStorage.setItem('cart', JSON.stringify(cart));
    // console.log('storage: ',cart[0].TITLE,'html: ',title)
    updateCartNum()
}

// update cart number real time (navbar)
function updateCartNum(){
    let cart= JSON.parse(sessionStorage.getItem('cart'))
    let cartLength = cart.length
    document.getElementsByClassName('badge')[0].innerText= cartLength
}
