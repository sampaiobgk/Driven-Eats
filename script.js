function changeSelection(food, category) {
    const selected = document.querySelector(`.${category} .selected`);
    const orderDisabled = document.querySelector('.order-disabled span');
    let qtd = orderDisabled.innerHTML.split(' ')[2];

    if(selected !== null) {
        selected.classList.remove('selected');
    } else {
        qtd === "2" ? orderDisabled.innerHTML = `${orderDisabled.innerHTML.replace(`os ${qtd} itens`, `mais ${Number(qtd - 1).toString()} item`)}` :
        orderDisabled.innerHTML = `${orderDisabled.innerHTML.replace(qtd, Number(qtd - 1).toString())}`;
    }
    food.classList.add('selected');

    orderButtonVisible();
}

function orderButtonVisible() {
    const ordenScreen = document.querySelector('footer div');

    if(document.querySelectorAll('.selected').length === 3) {
        ordenScreen.lastElementChild.style.display = "initial";
        ordenScreen.firstElementChild.style.display = "none";
    }
}

function orderButton() {
    const orderScreen = document.querySelector('.order-screen');
    const categoriesSelected = document.querySelectorAll('.selected .food-content');
    const foodOrders = document.querySelectorAll('.food-orders');
    const orderTotal = document.querySelector('.order-total');
    let total = 0;

    orderScreen.style.display = "flex";

    foodOrders.forEach((order, i) => {
        order.firstElementChild.innerHTML = categoriesSelected[i].firstElementChild.textContent;
        order.lastElementChild.innerHTML = categoriesSelected[i].querySelector('h5:last-child').textContent;
    })
    
    categoriesSelected.forEach((item) => {
        total += Number(item.querySelector('h5:last-child').textContent.replace(',', '.'));
    })

    orderTotal.firstElementChild.innerHTML = "TOTAL";
    orderTotal.lastElementChild.innerHTML = `R$ ${total.toFixed(2).toString().replace('.', ',')}`;
}

function sendOrder() {
    // Seleciona os elementos com os pedidos
    const foodOrders = document.querySelectorAll('.food-orders');
    const orderTotal = document.querySelector('.order-total');

    // Texto da mensagem sem Nome e Endereço
    const encodedText = `Olá, gostaria de fazer um pedido: 
- Prato: ${foodOrders[0].firstElementChild.textContent} 
- Bebida: ${foodOrders[1].firstElementChild.textContent}
- Sobremesa: ${foodOrders[2].firstElementChild.textContent}
Total: R$ ${Number(orderTotal.lastElementChild.textContent.split(' ')[1].replace(',', '.')).toFixed(2)}`;

    // Link do WhatsApp com a mensagem codificada
    const readyMessage = `https://wa.me/5513991289175?text=${encodeURIComponent(encodedText)}`;
    
    // Abre o WhatsApp Web com a mensagem pronta
    window.open(readyMessage);
}

function cancelOrder() {
    const orderScreen = document.querySelector('.order-screen');
    orderScreen.style.display = "none";
}
