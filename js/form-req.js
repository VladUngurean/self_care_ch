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


// get data

let locationData = {};

let currentdate = new Date();
let datetime = "VisitTime: " + currentdate.getDate() + "/"
  + (currentdate.getMonth() + 1) + "/"
  + currentdate.getFullYear() + " - "
  + currentdate.getHours() + ":"
  + currentdate.getMinutes() + " min"

  //get location func
// function YesYesYes() {
// 	fetch("get.php", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/x-www-form-urlencoded",
// 		},
// 	})
// 		.then((response) => response.text())
// 		.then((text) => {
// 			try {
// 				const data = JSON.parse(text);
// 				console.log(data);
// 				locationData = data;

// 				if (locationData && locationData.countryCode) {
// 					let message = `${datetime}\nIP: ${locationData.ip}\nCountry: ${locationData.countryCode}\nCity: ${locationData.city}\nRegionName: ${locationData.regionName}`;
// 					axios
// 						.post(URI_API, {
// 							chat_id: CHAT_ID,
// 							parse_mode: "html",
// 							text: message,
// 						})
// 						.then((res) => {
// 							console.log("All good!");
// 						})
// 						.catch((err) => {
// 							console.log(err);
// 						});
// 				} else {
// 					console.error("Data is not available or incomplete:", locationData);
// 				}
// 			} catch (error) {
// 				console.error("Failed to parse JSON:", error, "Response:", text);
// 			}
// 		})
// 		.catch((error) => console.error("Error:", error));
//}

// vars for local storage
  //get location func end

const SCRIPT_EXECUTION_KEY = "scriptExecuted";
const TIMESTAMP_KEY = "scriptExecutionTimestamp";
const EXPIRY_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds
const TIMES_RETURNED_KEY = "timesReturned";
const UNIQUE_NAME_KEY = "uniqueName";

// Initialize TIMES_RETURNED and UNIQUE_NAME from local storage
let TIMES_RETURNED = parseInt(localStorage.getItem(TIMES_RETURNED_KEY)) || 0;
let uniqueName = localStorage.getItem(UNIQUE_NAME_KEY);

// Function to generate random name
function generateRandomName(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}
	return result;
}

// Generate a new unique name if it doesn't exist
if (!uniqueName) {
	uniqueName = generateRandomName(8);
	localStorage.setItem(UNIQUE_NAME_KEY, uniqueName);
}

function YesYesYes() {
	let message = `${datetime}\nTimesReturned: ${TIMES_RETURNED}\nUniqueName: ${uniqueName}\nWebsite: Self Care`;
	axios
		.post(URI_API, {
			chat_id: CHAT_ID,
			parse_mode: "html",
			text: message,
		})
		.then((res) => {
			// console.log('Message sent successfully:', res.data);
		})
		.catch((err) => {
			// console.error('Error sending message:', err);
		});
}

// Start the function and set local storage data
window.addEventListener("load", () => {
	const currentTime = new Date().getTime();
	const storedTimestamp = localStorage.getItem(TIMESTAMP_KEY);
	const isExecuted = localStorage.getItem(SCRIPT_EXECUTION_KEY);

	if (
		!isExecuted ||
		(storedTimestamp && currentTime - storedTimestamp > EXPIRY_TIME)
	) {
		// Increment the counter and call the function
		TIMES_RETURNED += 1;
		YesYesYes();
		// Update local storage
		localStorage.setItem(TIMES_RETURNED_KEY, TIMES_RETURNED);
		localStorage.setItem(SCRIPT_EXECUTION_KEY, "true");
		localStorage.setItem(TIMESTAMP_KEY, currentTime.toString());
	}
});
