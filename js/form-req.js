// const TOKEN = '7363871608:AAFrCmY9oX2-fYIfEfGIWWiiaRU9BiylqCg';
// const CHAT_ID = '-1002227620906';
// const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

//TRELLO BOT START

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

	let massage = `<b>Заявка c сайта(TT): ${productName.value}</b> \n`;
		massage += `<b>Имя: ${nameInput.value} </b>\n`;
		massage += `<b>Номер: ${inputPhone.value}</b>\n`;
	console.log(massage);

	axios.post(URI_API, {
			chat_id: CHAT_ID,
			parse_mode: 'html',
			text: massage
		})
		.then( ( res ) => {
            console.log("all good");
			// location.href = "thank-you-page.html";
			// alert("All good!")
		} )
		.catch( ( err ) => {
			console.log(err);
			alert("Ошибка!")
			sendOrderForm.reset();
		} )
		// .finally( ( err ) => {} );
	
        let messageTrelo = `Заявка c сайта(TT): ${productName.value} \n
        Имя: ${nameInput.value} \n
        Номер: ${inputPhone.value} \n
        Адрес:  \n `;
        console.log(messageTrelo);
    
    // Получение списка ID
    axios.get(`https://api.trello.com/1/boards/${TRELLO_BOARD_ID}/lists?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`)
        .then((res) => {
            const lists = res.data;
            const list = lists.find(l => l.name === TRELLO_LIST_NAME);
            if (list) {
                // Добавление карточки в список
                axios.post(`https://api.trello.com/1/cards`, {
                    key: TRELLO_API_KEY,
                    token: TRELLO_API_TOKEN,
                    idList: list.id,
                    name: `Заявка c сайта: foamtt.codeshop.md \n Имя: ${nameInput.value} \n Номер: ${inputPhone.value}`,
                    desc: messageTrelo
                })
                .then((res) => {
                    console.log("Заявка успешно добавлена :", res.data);
                    setTimeout(() => {
                        location.href = "thank-you-page.html";
                    }, 100);
                })
                .catch((err) => {
                    console.error("Ошибка при добавлении заявки :", err);
                    alert("Ошибка при отправке !");
                });
            } else {
                console.error("Список с именем 'Заявки' не найден");
                alert("Список с именем 'Заявки' не найден");
            }
        })
        .catch((err) => {
            console.error("Ошибка при получении списко:", err);
            alert("Ошибка при получении списко!");
        });
});

