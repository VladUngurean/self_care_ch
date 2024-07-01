const TOKEN = '7384728233:AAEqn5NrLORpp-CpywQkperU_Rk0YS7exLM';
const CHAT_ID = '951582541';
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

//TRELLO BOT START

// let cart_items = document.querySelectorAll(".cart-item-name");
let cart_items = document.querySelectorAll("cart-item");
cart_items.forEach(e =>{
    let message = (
    e.querySelector(".cart-item-name").innerText +
    e.querySelector(".cart-item-price").innerText +
    e.querySelector(".cart-item-quantity").innerText)
    message += message
})

let productName = document.getElementById("productName");
const placeOrderForm = document.getElementById("placeOrderForm");
let buttonOrderSend = document.getElementById("buttonPlaceOrder");
let nameInput = document.querySelector( '#userName' );
//перевірка номеру
let inputPhone = document.querySelector( '#phone' );	
// Маска для телефона
const mask = new IMask( inputPhone, {
	mask: '+373(00)00-00-00',
	lazy: false
} );

function checkInput() {
    if (inputPhone.value.length > 0 && inputPhone.value[5] == '0' || inputPhone.value[0] == 0) {
        inputPhone.value = '';
    }
}

placeOrderForm.addEventListener("submit", ( e ) =>{
	e.preventDefault();
    if (!inputPhone.value || inputPhone.value.indexOf('_') !== -1) {
		alert('Введие правильный номер телефона.');
        return false;
	}

    let cart_items = document.querySelectorAll(".cart-item");
    let total_price = document.querySelector("#total-total");
    let message = "";
        cart_items.forEach(e =>{
            message += 
            e.querySelector(".cart-item-name").innerText + " " + e.querySelector(".cart-item-price").innerText + "\n" +
            e.querySelector(".cart-item-quantity").innerText + " шт." + "\n" + "\n"
        })
        message += `Цена: ${total_price.innerText} \n Имя: ${nameInput.value} \n Номер: ${inputPhone.value}\n`;
        console.log(message);
	// console.log(massage);

	axios.post(URI_API, {
			chat_id: CHAT_ID,
			parse_mode: 'html',
			text: message
		})
		.then( ( res ) => {
            console.log("all good");
			location.href = "thank-you-page.html";
			// alert("All good!")
		} )
		.catch( ( err ) => {
			console.log(err);
			alert("Ошибка!")
			sendOrderForm.reset();
		} )
});

