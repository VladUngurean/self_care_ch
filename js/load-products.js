async function loadProductsFromJSON() {
    try {
        const response = await fetch("../products.json");
        const data = await response.json();
        const products = data.products;
        const productContainer = document.querySelector(".swiper-wrappers.product-list.product-list-vertical");

        products.forEach((product) => {
            const li = document.createElement("li");
            li.classList.add("swiper-slidess", "text-center");

            const productLeft = document.createElement("span");
            productLeft.classList.add("product-list-left", "pull-left");
            const productImages = document.createElement("a");
            productImages.href = "#";
            productImages.dataset.target = "#product-01";
            productImages.dataset.toggle = "modal";
            productImages.dataset.productId = product.id; // Store product ID
            productImages.classList.add("product-link"); // Add class for event listener
            const primaryImg = document.createElement("img");
            primaryImg.classList.add("product-list-primary-img");
            primaryImg.src = product.image_primary;
            const secondaryImg = document.createElement("img");
            secondaryImg.classList.add("product-list-secondary-img");
            secondaryImg.src = product.image_secondary;
            productImages.appendChild(primaryImg);
            productImages.appendChild(secondaryImg);
            productLeft.appendChild(productImages);

            const productRight = document.createElement("div");
            // productRight.href = "#";
            productRight.dataset.target = "#product-01";
            // productRight.dataset.toggle = "modal";
            productRight.dataset.productId = product.id; // Store product ID
            productRight.classList.add("product-link"); // Add class for event listener
            productRight.classList.add("product-list-right", "pull-left");
            const productName = document.createElement("span");
            productName.classList.add("product-list-name", "h4", "black-color");
            productName.innerHTML = product.name;
            const productPrice = document.createElement("span");
            productPrice.classList.add("product-list-price");
            productPrice.textContent = product.price.toFixed(2) + " лей";

            const addButton = document.createElement("button");
            addButton.classList.add("btn", "btn-default", "add-item");
            addButton.type = "button";
            addButton.dataset.image = product.image_primary;
            addButton.dataset.name = product.name;
            addButton.dataset.cost = product.price.toFixed(2);
            addButton.dataset.id = product.id;
            addButton.innerHTML = `<svg width="32px" fill="#000000" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path> </g></svg>`;
            productRight.appendChild(productName);
            productRight.appendChild(productPrice);
            productRight.appendChild(addButton);

            li.appendChild(productLeft);
            li.appendChild(productRight);

            productContainer.appendChild(li);
        });

        // Add event listeners to product links
        document.querySelectorAll(".product-link").forEach(link => {
            link.addEventListener("click", function(event) {
                const productId = event.currentTarget.dataset.productId;
                const product = products.find(p => p.id == productId);
                if (product) {
                    populateModal(product);
                }
            });
        });

        console.log("Products loaded from JSON!");
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

function populateModal(product) {
    // Set the carousel images
    const carouselInner = document.querySelector(".carousel-inner.cont-slider");
    const carouselIndicators = document.querySelector(".carousel-indicators");
    carouselInner.innerHTML = "";
    carouselIndicators.innerHTML = "";

    const images = [product.image_primary, ...product.additional_images];
    images.forEach((image, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("item");
        if (index === 0) {
            carouselItem.classList.add("active");
        }
        const img = document.createElement("img");
        img.src = image;
        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);

        const indicator = document.createElement("li");
        if (index === 0) {
            indicator.classList.add("active");
        }
        indicator.dataset.slideTo = index;
        indicator.dataset.target = "#product-carousel";
        const indicatorImg = document.createElement("img");
        indicatorImg.src = image;
        indicator.appendChild(indicatorImg);
        carouselIndicators.appendChild(indicator);
    });

    // Set the modal title and price
    document.querySelector(".modal-body .nk").innerHTML = product.name;
    document.querySelector(".modal-body .product-right-section span").textContent = product.price.toFixed(2) + " лей";

    // Set the modal description
    document.querySelector(".modal-body .product-description h4").innerHTML = product.name;
    document.querySelector(".modal-body .product-description p").textContent = product.description;

    // Set the modal details tab content
    document.querySelector("#tab1 p").innerHTML = product.details;
    document.querySelector("#tab2 p").innerHTML = product.how_use;
    document.querySelector("#tab3 p").innerHTML = product.details;
    document.querySelector(".second_info-title").innerHTML = product.additional_info_title;
    document.querySelector(".second_info-text").innerHTML = product.additional_info_text;

    // Set the "Добавить в корзину" button data attributes
    const modalButton = document.querySelector("#modal_button");
    modalButton.dataset.image = product.image_primary;
    modalButton.dataset.name = product.name;
    modalButton.dataset.cost = product.price.toFixed(2);
    modalButton.dataset.id = product.id;
}

// Call the function to load products when the page loads
//   document.addEventListener('DOMContentLoaded', loadProductsFromJSON);
function addToCart() {
    let curCost = 0;
    let curName = 0;
    let curImage = 0; // Add curImage variable
    let cartItems1 = {}; // Use an object to store cart items for the first cart
    let fx = 0, fy = 0;
    let tx = 0, ty = 0;
    let curItem = "";
    let item_list = document.querySelectorAll(".add-item");
    console.log(item_list);

    function updateDeliveryCost() {
        let delivery = parseFloat($("input[name=delivery]:checked").val());
        document.querySelectorAll("#cost_delivery").forEach(e => {
            e.innerHTML = delivery.toFixed(2);
        });

        let cartCost = parseFloat(document.querySelector("#cost_value").innerHTML);
        let totalCost = cartCost + delivery;
        document.querySelectorAll("#total-total").forEach(e => {
            e.innerHTML = totalCost.toFixed(2);
        });
        $("[id=amount]").val(totalCost.toFixed(2));
    }

    updateDeliveryCost(); // Initial call to set the delivery cost

    // Add event listener for delivery option change
    $("input[name=delivery]").on("change", function() {
        updateDeliveryCost();
    });

    for (let i = 0; i < item_list.length; i++) {
        item_list[i].addEventListener("click", function (ev) {
            curCost = parseFloat(this.getAttribute("data-cost"));
            curName = this.getAttribute("data-name");
            curImage = this.getAttribute("data-image");
            let id = this.getAttribute("data-id");
            let x = $(this).position();
            fx = (window.innerWidth - 982) / 2 + 160 * (id - 1);
            (function () {
                mover_animator(fx, fy, tx, ty);
            })(
                setTimeout(function () {
                    addItem(id, curCost, curName, curImage);
                }, 100)
            );
        });
    }

    $(document).on("click", ".cart-item-remove", function () {
        let itemId = $(this).closest(".cart-item").data("id");
        let itemCost = parseFloat($(this).closest(".cart-item").find(".cvalue").text());
        removeItem(itemId, itemCost);
    });
    
    $(document).on("click", ".cart-item-increase", function () {
        let itemId = $(this).closest(".cart-item").data("id");
        let itemCost = parseFloat($(this).closest(".cart-item").find(".cvalue").text());
        increaseItem(itemId, itemCost);
    });
    
    $(document).on("click", ".cart-item-decrease", function () {
        let itemId = $(this).closest(".cart-item").data("id");
        let itemCost = parseFloat($(this).closest(".cart-item").find(".cvalue").text());
        decreaseItem(itemId, itemCost);
    });

    function addItem(id, cost, name, image) {
        cost = parseFloat(cost); // Ensure cost is a number
        if (cartItems1[id]) {
            cartItems1[id].quantity += 1;
            updateItemElement(id, cartItems1[id].quantity);
        } else {
            cartItems1[id] = { cost: cost, name: name, image: image, quantity: 1 };
            addItemElement(id, cost, name, image);
        }
        updateItemCounter();
        toggleEmptyCart();
        addCost(cost);
    }

    function updateItemElement(id, quantity) {
        let itemElements1 = document.querySelectorAll("#item" + id + " .cart-item-counter .cart-item-quantity");
        // let itemElements2 = document.querySelectorAll("#cart2 #item" + id + " .cart-item-quantity");
        itemElements1.forEach((el) => (el.textContent = quantity));
        // itemElements2.forEach((el) => (el.textContent = "Quantity: " + quantity));
    }
    
    let garbageSVG = '<svg fill="#f35a3f" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 318.317 318.317" xml:space="preserve" stroke="#f35a3f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M269.889,34.498h-50.983V13.273C218.906,5.954,212.952,0,205.633,0h-18.937c-2.762,0-5,2.238-5,5s2.238,5,5,5h18.937 c1.805,0,3.273,1.468,3.273,3.273v21.226h-99.495V13.273c0-1.805,1.468-3.273,3.273-3.273h58.013c2.762,0,5-2.238,5-5s-2.238-5-5-5 h-58.013c-7.319,0-13.273,5.954-13.273,13.273v21.226H74.496c-2.761,0-5,2.238-5,5c0,2.762,2.239,5,5,5h195.393 c0.283,0,0.514,0.23,0.514,0.514v29.012c0,0.283-0.23,0.514-0.514,0.514H57.934h-9.506c-0.283,0-0.514-0.23-0.514-0.514V45.012 c0-0.283,0.231-0.514,0.514-0.514h8.269c2.761,0,5-2.238,5-5c0-2.762-2.239-5-5-5h-8.269c-5.797,0-10.514,4.717-10.514,10.514 v29.012c0,5.797,4.716,10.514,10.514,10.514h9.506V280.85c0,20.66,16.808,37.468,37.468,37.468h73.294c2.762,0,5-2.238,5-5 c0-2.762-2.238-5-5-5H95.403c-15.146,0-27.468-12.322-27.468-27.468V84.537h182.448V280.85c0,15.145-12.322,27.468-27.468,27.468 h-34.218c-2.762,0-5,2.238-5,5c0,2.762,2.238,5,5,5h34.218c20.66,0,37.468-16.808,37.468-37.468V84.537h9.507 c5.797,0,10.514-4.717,10.514-10.514V45.012C280.403,39.215,275.686,34.498,269.889,34.498z"></path> <path d="M92.412,207.406c-2.761,0-5,2.238-5,5v64.496c0,2.762,2.239,5,5,5c2.761,0,5-2.238,5-5v-64.496 C97.412,209.645,95.173,207.406,92.412,207.406z"></path> <path d="M97.412,101.411c0-2.762-2.239-5-5-5c-2.761,0-5,2.238-5,5v86.996c0,2.762,2.239,5,5,5c2.761,0,5-2.238,5-5V101.411z"></path> <path d="M131.41,101.411v175.491c0,2.762,2.239,5,5,5c2.761,0,5-2.238,5-5V101.411c0-2.762-2.239-5-5-5 C133.649,96.411,131.41,98.649,131.41,101.411z"></path> <path d="M224.405,136.561c2.762,0,5-2.238,5-5v-30.15c0-2.762-2.238-5-5-5c-2.762,0-5,2.238-5,5v30.15 C219.405,134.323,221.643,136.561,224.405,136.561z"></path> <path d="M219.405,152.494c0,2.762,2.238,5,5,5c2.762,0,5-2.238,5-5v-5.515c0-2.762-2.238-5-5-5c-2.762,0-5,2.238-5,5V152.494z"></path> <path d="M219.405,276.902c0,2.762,2.238,5,5,5c2.762,0,5-2.238,5-5V168.895c0-2.762-2.238-5-5-5c-2.762,0-5,2.238-5,5V276.902z"></path> <path d="M180.408,251.904c2.762,0,5-2.238,5-5V101.411c0-2.762-2.238-5-5-5s-5,2.238-5,5v145.493 C175.408,249.666,177.646,251.904,180.408,251.904z"></path> <path d="M185.408,276.902v-13.499c0-2.762-2.238-5-5-5s-5,2.238-5,5v13.499c0,2.762,2.238,5,5,5S185.408,279.664,185.408,276.902z"></path> </g> </g></svg>'
    
    function addItemElement(id, cost, name, image) {
        let itemHTML = "<div class='cart-item' id='item" + id + "' data-id='" + id + "'>" +
            "<span class='cart-item-image'><img alt='" + name + "' src='" + image + "'/></span>" +
            "<span class='cart-item-name h4'>" + name + "</span>" +
            "<span class='cart-item-price'><span class='cvalue'>" + cost + "</span> лей</span>" +
            "<span class='cart-item-remove'><span class='ti-close'>" + garbageSVG + "</span></span>" +
            "<div class='cart-item-counter'> <span class='cart-item-increase'>+</span> <span class='cart-item-quantity'>1</span> <span class='cart-item-decrease'>-</span> </div>" +
            "</div>";
        document.querySelector("#items").innerHTML += itemHTML;
        // document.querySelector("#cart2 #items").innerHTML += itemHTML;
    }

    function increaseItem(id, cost) {
        if (cartItems1[id]) {
            cartItems1[id].quantity += 1;
            updateItemElement(id, cartItems1[id].quantity);
            addCost(cost);
            updateItemCounter();
        }
    }

    function decreaseItem(id, cost) {
        if (cartItems1[id]) {
            if (cartItems1[id].quantity <= 1) {
                return;
            }
            cartItems1[id].quantity -= 1;
            if (cartItems1[id].quantity <= 0) {
                removeItem(id, cost * cartItems1[id].quantity, true); // true to remove item
                removeCost(cost);
            } else {
                updateItemElement(id, cartItems1[id].quantity);
                removeCost(cost);
                updateItemCounter();
            }
        }
    }

    function addCost(amount) {
        let oldCost = parseFloat(document.getElementById("cost_value").innerHTML);
        let newCost = oldCost + amount;
        let delivery = parseFloat($("input[name=delivery]:checked").val());
        let cartTotal = newCost + delivery;
        document.querySelectorAll("#cost_value").forEach(e =>{
            e.innerHTML = newCost.toFixed(2);
        })
        document.querySelectorAll("#total-total").forEach(e =>{
            e.innerHTML = cartTotal.toFixed(2);
        })
        $("[id=amount]").val(cartTotal.toFixed(2));

        console.log(newCost);
    }

    function removeItem(id, cost, removeElement) {
        if (cartItems1[id]) {
            if (!removeElement) {
                let totalItemCost = cartItems1[id].quantity * cost;
                delete cartItems1[id];
                document.querySelectorAll("#item" + id).forEach((el) => el.remove());
                // document.querySelectorAll("#cart2 #item" + id).forEach((el) => el.remove());
                removeCost(totalItemCost);
            } else {
                delete cartItems1[id];
                document.querySelectorAll("#item" + id).forEach((el) => el.remove());
            }
            updateItemCounter();
        }
    }

    function removeCost(amount) {
        let oldCost = parseFloat(document.getElementById("cost_value").innerHTML);
        let newCost = oldCost - amount;
        if (isNaN(newCost) || newCost < 0) {
            newCost = 0.0;
        }
        let delivery = parseFloat($("input[name=delivery]:checked").val());
        let cartTotal = newCost + delivery;
        document.getElementById("total-total").innerHTML = cartTotal.toFixed(2);
        document.getElementById("cost_value").innerHTML = newCost.toFixed(2);
        $("#amount").val(cartTotal.toFixed(2));
        console.log(newCost);
    }

    function updateItemCounter() {
        let totalQuantity = 0;
        for (let id in cartItems1) {
            totalQuantity += cartItems1[id].quantity;
        }
        $(".items-counter").empty();
        document.querySelectorAll(".items-counter").forEach(e => {
            e.innerHTML += "<span class='animate'>" + totalQuantity + "<span class='circle'></span></span>";
        })
        toggleEmptyCart();
    }

    function mover_animator(x1, y1, x2, y2) {
        let div = document.createElement("div");
        div.className = "mover_animator";
        div.style.display = "none";
        document.body.appendChild(div);
        $(div)
            .css({
                left: x1 + "px",
                bottom: y1 + "px",
                top: "auto",
                right: "auto",
            })
            .fadeIn(10)
            .animate({
                right: "auto",
                top: "auto",
                left: window.innerWidth - 200 + "px",
                bottom: window.innerHeight - 240 + "px",
            },
            300
        );
        setTimeout(function () {
            $(div).remove();
            toggleEmptyCart();
        }, 200);
    }

    function toggleEmptyCart() {
        if (document.querySelectorAll(".cart-item").length >= 1) {
            document.querySelector("#cart-summary").style.display = "block";
            document.querySelector("#cart-delivery").style.display = "block";
            // document.querySelector("#cart-form").style.display = "block";
            document.querySelector("#cart-empty").style.display = "none";
            document.querySelector("#userName").style.display = "block";
            document.querySelector("#phone").style.display = "block";
            document.querySelector("#sendOrderBtn").style.display = "block";
            
            document.querySelectorAll("#items-counter").forEach(e =>{
                e.style.display = "block";
            });
        } else {
            document.querySelector("#cart-summary").style.display = "none";
            document.querySelector("#cart-delivery").style.display = "none";
            // document.querySelector("#cart-form").style.display = "none";
            document.querySelector("#cart-empty").style.display = "block";
            document.querySelector("#userName").style.display = "none";
            document.querySelector("#phone").style.display = "none";
            document.querySelector("#sendOrderBtn").style.display = "none";

            document.querySelectorAll("#items-counter").forEach(e =>{
                e.style.display = "none";
            });
        }
    }
}



async function loadProducts() {
    // Do something asynchronous, like fetching data or processing something
    await loadProductsFromJSON(); // Wait for the products to be loaded
    console.log("items laod done!");
}

async function addFunctionality() {
    await loadProducts(); // Wait for the first function to complete
    // Now you can execute addToCart() or any other logic that should happen after the first function
    console.log("Добавить в корзину functionality done!");
    addToCart();
}

addFunctionality(); // Call the second function to start the process

// test
document.addEventListener('DOMContentLoaded', function() {
    // Function to check and update button background colors
    function checkAndUpdateButtons() {
        // Get all buttons and reset their background color to gray
        const allButtons = document.querySelectorAll('.btn');
        allButtons.forEach(button => {
            button.style.backgroundColor = '';
        });

        // Get all cart items within #items
        const items = document.querySelectorAll('#items .cart-item');

        // Iterate over each item
        items.forEach(item => {
            // Get the data-id of the current item
            const itemId = item.getAttribute('data-id');
            
            // Find the button with the matching data-id
            const button = document.querySelector(`.btn[data-id="${itemId}"]`);
            
            // If the button exists, change its background color to red
            if (button) {
                button.style.backgroundColor = '#5cba48';
            }
        });
    }

    // Observe changes to the element with id="items"
    const itemsContainer = document.getElementById('items');
    const observer = new MutationObserver(checkAndUpdateButtons);
    
    // Configuration of the observer
    const config = { childList: true, subtree: true };

    // Start observing the target node for configured mutations
    observer.observe(itemsContainer, config);

    // Initial check
    checkAndUpdateButtons();
});
