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

function ready(){
    pagechange()
    updatesubTotal()
    updateTotal()

}

var cartList = JSON.parse(sessionStorage.getItem('cart'));

for (var i=0; i<cartList.length; i++){
    var title = cartList[i].TITLE
    var price = cartList[i].PRICE
    var imageSrc = cartList[i].IMGSRC
    var qty = cartList[i].QTY

    var cartRow = document.createElement('div')
    // adding class (for styling)
    cartRow.classList.add('summary-item-each')
    var cartItems = document.getElementsByClassName('summary-items')[0]
    var cartRowContents=`
    <img class="summary-item-image" src="${imageSrc}" width="100" height="100">
    <div class="summary-item-details">
        <div class="summary-item-title">${title}</div>
        <div class="summary-item-price ">${price}</div>
        <div class="summary-quantity-input">Qty:${qty}</div>
    </div>`
    cartRow.innerHTML= cartRowContents
    cartItems.append(cartRow)
}

// update subtotal
function updatesubTotal(){
    var cartItemContainer = document.getElementsByClassName('summary-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('summary-item-each')
    var total =0
    for (var i=0; i<cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('summary-item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('summary-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('RM',''))
        var quantity = quantityElement.innerText.replace('Qty:','')
        total += (price*quantity)
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName('summary-subtotal-price')[0].innerText ='RM'+total
}

// update total payable
function updateTotal(){
    var total =0
    var subtotalElement = document.getElementsByClassName('summary-subtotal-price')[0]
    var shippingFeeElement = document.getElementsByClassName('summary-shp-price')[0]
    var subtotal = parseFloat(subtotalElement.innerText.replace('RM',''))
    var shippingfee = parseFloat(shippingFeeElement.innerText.replace('RM',''))
    total += (subtotal+shippingfee)
    total = Math.round(total*100)/100
    document.getElementsByClassName('summary-total-price')[0].innerText ='RM'+total
}


function pagechange(frompage, topage) {
    var page=document.getElementsByClassName('info_'+frompage)[0];
    if (!page) return false;
    page.style.visibility='hidden';
    page.style.display='none';
  
    page=document.getElementsByClassName('info_'+topage)[0];
    if (!page) return false;
    page.style.display='block';
    page.style.visibility='visible';
  
    return true;
  }

