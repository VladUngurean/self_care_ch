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

    function addItemElement(id, cost, name, image) {
        let itemHTML = "<div class='cart-item' id='item" + id + "' data-id='" + id + "'>" +
            "<span class='cart-item-image'><img alt='" + name + "' src='" + image + "'/></span>" +
            "<span class='cart-item-name h4'>" + name + "</span>" +
            "<span class='cart-item-price'>$<span class='cvalue'>" + cost + "</span></span>" +
            "<span class='cart-item-remove'><span class='ti-close'></span></span>" +
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
            document.querySelectorAll("#cart-summary").forEach(e => {
                e.style.display = "block";
            });
            document.querySelectorAll("#cart-delivery").forEach(e => {
                e.style.display = "block";
            });
            document.querySelectorAll("#cart-form").forEach(e => {
                e.style.display = "block";
            });
            document.querySelectorAll("#cart-empty").forEach(e => {
                e.style.display = "none";
            });
            document.querySelectorAll("#items-counter").forEach(e => {
                e.style.display = "block";
            });
        } else {
            document.querySelectorAll("#cart-summary").forEach(e => {
                e.style.display = "none";
            });
            document.querySelectorAll("#cart-delivery").forEach(e => {
                e.style.display = "none";
            });
            document.querySelectorAll("#cart-form").forEach(e => {
                e.style.display = "none";
            });
            document.querySelectorAll("#cart-empty").forEach(e => {
                e.style.display = "block";
            });
            document.querySelectorAll("#items-counter").forEach(e => {
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
