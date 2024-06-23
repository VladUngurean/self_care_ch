async function loadProductsFromJSON() {
    try {
        const response = await fetch("../products.json");
        const data = await response.json();
        const products = data.products;
        const productContainer = document.querySelector(
            ".swiper-wrappers.product-list.product-list-vertical"
        );

        products.forEach((product) => {
            const li = document.createElement("li");
            li.classList.add("swiper-slidess", "text-center");

            const productLeft = document.createElement("span");
            productLeft.classList.add("product-list-left", "pull-left");
            const productImages = document.createElement("a");
            productImages.href = "#";
            productImages.dataset.target = "#product-01";
            productImages.dataset.toggle = "modal";
            const primaryImg = document.createElement("img");
            primaryImg.classList.add("product-list-primary-img");
            primaryImg.src = product.image_primary;
            const secondaryImg = document.createElement("img");
            secondaryImg.classList.add("product-list-secondary-img");
            secondaryImg.src = product.image_secondary;
            productImages.appendChild(primaryImg);
            productImages.appendChild(secondaryImg);
            productLeft.appendChild(productImages);

            const productRight = document.createElement("a");
            productRight.href = "#";
            productRight.dataset.target = "#product-01";
            productRight.dataset.toggle = "modal";
            productRight.classList.add("product-list-right", "pull-left");
            const productName = document.createElement("span");
            productName.classList.add("product-list-name", "h4", "black-color");
            productName.textContent = product.name;
            const productPrice = document.createElement("span");
            productPrice.classList.add("product-list-price");
            productPrice.textContent = "$" + product.price.toFixed(2);
            // const ratingArea = document.createElement("span");
            // ratingArea.classList.add("rating-area");
            // for (let i = 0; i < product.rating; i++) {
            //     const star = document.createElement("span");
            //     star.classList.add("ti-star", "high_light");
            //     ratingArea.appendChild(star);
            // }
            productRight.appendChild(productName);
            productRight.appendChild(productPrice);
            // productRight.appendChild(ratingArea);

            const addButton = document.createElement("button");
            addButton.classList.add("btn", "btn-default", "add-item");
            addButton.type = "button";
            addButton.dataset.image = product.image_primary;
            addButton.dataset.name = product.name;
            addButton.dataset.cost = product.price.toFixed(2);
            addButton.dataset.id = product.id;
            addButton.textContent = "add to cart";

            li.appendChild(productLeft);
            li.appendChild(productRight);
            li.appendChild(addButton);

            productContainer.appendChild(li);
        });

        console.log("Products loaded from JSON!");
    } catch (error) {
        console.error("Error loading products:", error);
    }
}
// Call the function to load products when the page loads
//   document.addEventListener('DOMContentLoaded', loadProductsFromJSON);

// function addToCart() {
//     let curCost = 0;
//     let curName = 0;
//     let curImage = 0; // Add curImage variable
//     let cartItems = {}; // Use an object to store cart items
//     let fx = 0,
//         fy = 0;
//     let tx = 0,
//         ty = 0;
//     let curItem = "";
//     let item_list = document.querySelectorAll(".add-item");
//     console.log(item_list);
//     $delivery = $("input[name=delivery]:checked").val();
//     let delivery = Number($delivery);
//     document.getElementById("cost_delivery").innerHTML = delivery.toFixed(2);
//     for (let i = 0; i < item_list.length; i++) {
//         item_list[i].addEventListener("click", function (ev) {
//             curCost = parseFloat(this.getAttribute("data-cost"));
//             curName = this.getAttribute("data-name");
//             curImage = this.getAttribute("data-image");
//             let id = this.getAttribute("data-id");
//             let x = $(this).position();
//             fx = (window.innerWidth - 982) / 2 + 160 * (id - 1);
//             (function () {
//                 mover_animator(fx, fy, tx, ty);
//             })(
//                 setTimeout(function () {
//                     addItem(id, curCost, curName, curImage);
//                 }, 350)
//             );
//         });
//     }

//     $(document).on("click", ".cart-item-remove", function () {
//         let itemId = $(this).parent(".cart-item").data("id");
//         let itemCost = parseFloat(
//             $(this).parent(".cart-item").find(".cvalue").text()
//         );
//         removeItem(itemId, itemCost);
//     });

//     $(document).on("click", ".cart-item-increase", function () {
//         let itemId = $(this).parent(".cart-item").data("id");
//         let itemCost = parseFloat(
//             $(this).parent(".cart-item").find(".cvalue").text()
//         );
//         increaseItem(itemId, itemCost);
//     });

//     $(document).on("click", ".cart-item-decrease", function () {
//         let itemId = $(this).parent(".cart-item").data("id");
//         let itemCost = parseFloat(
//             $(this).parent(".cart-item").find(".cvalue").text()
//         );
//         decreaseItem(itemId, itemCost);
//     });

//     function addItem(id, cost, name, image) {
//         cost = parseFloat(cost); // Ensure cost is a number
//         if (cartItems[id]) {
//             cartItems[id].quantity += 1;
//             let itemElement = document.querySelector(
//                 "#item" + id + " .cart-item-quantity"
//             );
//             itemElement.textContent = "Quantity: " + cartItems[id].quantity;
//         } else {
//             cartItems[id] = { cost: cost, name: name, image: image, quantity: 1 };
//             document.getElementById("items").innerHTML +=
//                 "<div class='cart-item hidden' id='item" +
//                 id +
//                 "' data-id='" +
//                 id +
//                 "'><span class='cart-item-image'><img alt='" +
//                 name +
//                 "' src='" +
//                 image +
//                 "'/></span><span class='cart-item-name h4'>" +
//                 name +
//                 "</span><span class='cart-item-price'>$<span class='cvalue'>" +
//                 cost +
//                 "</span></span><span class='cart-item-quantity'>Quantity: 1</span><span class='cart-item-remove'><span class='ti-close'></span></span><span class='cart-item-increase'>+</span><span class='cart-item-decrease'>-</span></div>";
//             }
//         updateItemCounter();
//         document.querySelector("#item" + id).classList.remove("hidden");
//         toggleEmptyCart();
//         addCost(cost);
//     }

//     function increaseItem(id, cost) {
//         if (cartItems[id]) {
//             cartItems[id].quantity += 1;
//             let itemElement = document.querySelector(
//                 "#item" + id + " .cart-item-quantity"
//             );
//             itemElement.textContent = "Quantity: " + cartItems[id].quantity;
//             addCost(cost);
//             updateItemCounter();
//         }
//     }

//     function decreaseItem(id, cost) {
//         if (cartItems[id]) {
//             cartItems[id].quantity -= 1;
//             if (cartItems[id].quantity <= 0) {
//                 removeItem(id, cost * cartItems[id].quantity, true); // true to remove item
//             } else {
//                 let itemElement = document.querySelector(
//                     "#item" + id + " .cart-item-quantity"
//                 );
//                 itemElement.textContent = "Quantity: " + cartItems[id].quantity;
//                 removeCost(cost);
//                 updateItemCounter();
//             }
//         }
//     }

//     function addCost(amount) {
//         let oldCost = parseFloat(document.getElementById("cost_value").innerHTML);
//         let newCost = oldCost + amount;
//         let delivery = parseFloat($("input[name=delivery]:checked").val());
//         let cartTotal = newCost + delivery;
//         document.getElementById("cost_value").innerHTML = newCost.toFixed(2);
//         document.getElementById("total-total").innerHTML = cartTotal.toFixed(2);
//         $("#amount").val(cartTotal.toFixed(2));
//     }

//     function removeItem(id, cost, removeElement) {
//         if (cartItems[id]) {
//             if (!removeElement) {
//                 let totalItemCost = cartItems[id].quantity * cost;
//                 delete cartItems[id];
//                 document.querySelector("#item" + id).remove();
//                 removeCost(totalItemCost);
//             } else {
//                 delete cartItems[id];
//                 document.querySelector("#item" + id).remove();
//             }
//             updateItemCounter();
//         }
//     }

//     function removeCost(amount) {
//         let oldCost = parseFloat(document.getElementById("cost_value").innerHTML);
//         let newCost = oldCost - amount;
//         if (isNaN(newCost) || newCost < 0) {
//             newCost = 0.0;
//         }
//         let delivery = parseFloat($("input[name=delivery]:checked").val());
//         let cartTotal = newCost + delivery;
//         document.getElementById("total-total").innerHTML = cartTotal.toFixed(2);
//         document.getElementById("cost_value").innerHTML = newCost.toFixed(2);
//         $("#amount").val(cartTotal.toFixed(2));
//     }

//     function updateItemCounter() {
//         let totalQuantity = 0;
//         for (let id in cartItems) {
//             totalQuantity += cartItems[id].quantity;
//         }
//         $("#items-counter").empty();
//         document.getElementById("items-counter").innerHTML +=
//             "<span class='animate'>" +
//             totalQuantity +
//             "<span class='circle'></span></span>";
//         toggleEmptyCart();
//     }

//     function mover_animator(x1, y1, x2, y2) {
//         let div = document.createElement("div");
//         div.className = "mover_animator";
//         div.style.display = "none";
//         document.body.appendChild(div);
//         $(div)
//             .css({
//                 left: x1 + "px",
//                 bottom: y1 + "px",
//                 top: "auto",
//                 right: "auto",
//             })
//             .fadeIn(10)
//             .animate(
//                 {
//                     right: "auto",
//                     top: "auto",
//                     left: window.innerWidth - 200 + "px",
//                     bottom: window.innerHeight - 240 + "px",
//                 },
//                 300
//             );
//         setTimeout(function () {
//             $(div).remove();
//             toggleEmptyCart();
//         }, 200);
//     }

//     function toggleEmptyCart() {
//         if (document.querySelectorAll(".cart-item").length >= 1) {
//             document.getElementById("cart-summary").style.display = "block";
//             document.getElementById("cart-delivery").style.display = "block";
//             document.getElementById("cart-form").style.display = "block";
//             document.getElementById("cart-empty").style.display = "none";
//             document.getElementById("items-counter").style.display = "block";
//         } else {
//             document.getElementById("cart-summary").style.display = "none";
//             document.getElementById("cart-delivery").style.display = "none";
//             document.getElementById("cart-form").style.display = "none";
//             document.getElementById("cart-empty").style.display = "block";
//             document.getElementById("items-counter").style.display = "none";
//         }
//     }

//     $("input").change(function () {
//         $delivery = $(this).val();
//         let total = parseFloat(document.getElementById("cost_value").innerHTML);
//         let delivery = parseFloat($delivery);
//         let cartTotal = total + delivery;
//         document.getElementById("total-total").innerHTML = cartTotal.toFixed(2);
//         $("#amount").val(cartTotal.toFixed(2));
//         document.getElementById("cost_delivery").innerHTML = delivery.toFixed(2);
//     });
// }

class ShoppingCart {
    constructor() {
        this.curCost = 0;
        this.curName = 0;
        this.curImage = 0;
        this.cartItems = {};
        this.fx = 0;
        this.fy = 0;
        this.tx = 0;
        this.ty = 0;
        this.curItem = "";
        this.item_list = document.querySelectorAll(".add-item");
        console.log(this.item_list);
        this.$delivery = $("input[name=delivery]:checked").val();
        this.delivery = Number(this.$delivery);
        document.getElementById("cost_delivery").innerHTML = this.delivery.toFixed(2);

        this.item_list.forEach((item, index) => {
            item.addEventListener("click", (ev) => {
                this.curCost = parseFloat(item.getAttribute("data-cost"));
                this.curName = item.getAttribute("data-name");
                this.curImage = item.getAttribute("data-image");
                let id = item.getAttribute("data-id");
                let x = $(item).position();
                this.fx = (window.innerWidth - 982) / 2 + 160 * (id - 1);
                setTimeout(() => {
                    this.addItem(id, this.curCost, this.curName, this.curImage);
                }, 350);
            });
        });

        $(document).on("click", ".cart-item-remove", () => {
            let itemId = $(".cart-item", this).data("id");
            let itemCost = parseFloat($(".cart-item .cvalue", this).text());
            this.removeItem(itemId, itemCost);
        });

        $(document).on("click", ".cart-item-increase", () => {
            let itemId = $(".cart-item", this).data("id");
            let itemCost = parseFloat($(".cart-item .cvalue", this).text());
            this.increaseItem(itemId, itemCost);
        });

        $(document).on("click", ".cart-item-decrease", () => {
            let itemId = $(".cart-item", this).data("id");
            let itemCost = parseFloat($(".cart-item .cvalue", this).text());
            this.decreaseItem(itemId, itemCost);
        });

        $("input").change(() => {
            this.$delivery = $(this).val();
            let total = parseFloat($("#cost_value").text());
            let delivery = parseFloat(this.$delivery);
            let cartTotal = total + delivery;
            $("#total-total").text(cartTotal.toFixed(2));
            $("#amount").val(cartTotal.toFixed(2));
            $("#cost_delivery").text(delivery.toFixed(2));
        });
    }

    addItem(id, cost, name, image) {
        cost = parseFloat(cost);
        if (this.cartItems[id]) {
            this.cartItems[id].quantity += 1;
            let itemElement = document.querySelector("#item" + id + " .cart-item-quantity");
            itemElement.textContent = "Quantity: " + this.cartItems[id].quantity;
        } else {
            this.cartItems[id] = { cost: cost, name: name, image: image, quantity: 1 };
            document.getElementById("items").innerHTML +=
                "<div class='cart-item hidden' id='item" +
                id +
                "' data-id='" +
                id +
                "'><span class='cart-item-image'><img alt='" +
                name +
                "' src='" +
                image +
                "'/></span><span class='cart-item-name h4'>" +
                name +
                "</span><span class='cart-item-price'>$<span class='cvalue'>" +
                cost +
                "</span></span><span class='cart-item-quantity'>Quantity: 1</span><span class='cart-item-remove'><span class='ti-close'></span></span><span class='cart-item-increase'>+</span><span class='cart-item-decrease'>-</span></div>";
        }
        this.updateItemCounter();
        document.querySelector("#item" + id).classList.remove("hidden");
        this.toggleEmptyCart();
        this.addCost(cost);
    }

    increaseItem(id, cost) {
        if (this.cartItems[id]) {
            this.cartItems[id].quantity += 1;
            let itemElement = document.querySelector("#item" + id + " .cart-item-quantity");
            itemElement.textContent = "Quantity: " + this.cartItems[id].quantity;
            this.addCost(cost);
            this.updateItemCounter();
        }
    }

    decreaseItem(id, cost) {
        if (this.cartItems[id]) {
            this.cartItems[id].quantity -= 1;
            if (this.cartItems[id].quantity <= 0) {
                this.removeItem(id, cost * this.cartItems[id].quantity, true);
            } else {
                let itemElement = document.querySelector("#item" + id + " .cart-item-quantity");
                itemElement.textContent = "Quantity: " + this.cartItems[id].quantity;
                this.removeCost(cost);
                this.updateItemCounter();
            }
        }
    }

    addCost(amount) {
        let oldCost = parseFloat($("#cost_value").text());
        let newCost = oldCost + amount;
        let delivery = parseFloat($("input[name=delivery]:checked").val());
        let cartTotal = newCost + delivery;
        $("#cost_value").text(newCost.toFixed(2));
        $("#total-total").text(cartTotal.toFixed(2));
        $("#amount").val(cartTotal.toFixed(2));
    }

    removeItem(id, cost, removeElement) {
        if (this.cartItems[id]) {
            if (!removeElement) {
                let totalItemCost = this.cartItems[id].quantity * cost;
                delete this.cartItems[id];
                $("#item" + id).remove();
                this.removeCost(totalItemCost);
            } else {
                delete this.cartItems[id];
                $("#item" + id).remove();
            }
            this.updateItemCounter();
        }
    }

    removeCost(amount) {
        let oldCost = parseFloat($("#cost_value").text());
        let newCost = oldCost - amount;
        if (isNaN(newCost) || newCost < 0) {
            newCost = 0.0;
        }
        let delivery = parseFloat($("input[name=delivery]:checked").val());
        let cartTotal = newCost + delivery;
        $("#total-total").text(cartTotal.toFixed(2));
        $("#cost_value").text(newCost.toFixed(2));
        $("#amount").val(cartTotal.toFixed(2));
    }

    updateItemCounter() {
        let totalQuantity = 0;
        for (let id in this.cartItems) {
            totalQuantity += this.cartItems[id].quantity;
        }
        $("#items-counter").empty();
        $("#items-counter").html(
            "<span class='animate'>" +
            totalQuantity +
            "<span class='circle'></span></span>"
        );
        this.toggleEmptyCart();
    }

    mover_animator(x1, y1, x2, y2) {
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
            .animate(
                {
                    right: "auto",
                    top: "auto",
                    left: window.innerWidth - 200 + "px",
                    bottom: window.innerHeight - 240 + "px",
                },
                300
            );
        setTimeout(() => {
            $(div).remove();
            this.toggleEmptyCart();
        }, 200);
    }

    toggleEmptyCart() {
        if (document.querySelectorAll(".cart-item").length >= 1) {
            document.getElementById("cart-summary").style.display = "block";
            document.getElementById("cart-delivery").style.display = "block";
            document.getElementById("cart-form").style.display = "block";
            document.getElementById("cart-empty").style.display = "none";
            document.getElementById("items-counter").style.display = "block";
        } else {
            document.getElementById("cart-summary").style.display = "none";
            document.getElementById("cart-delivery").style.display = "none";
            document.getElementById("cart-form").style.display = "none";
            document.getElementById("cart-empty").style.display = "block";
            document.getElementById("items-counter").style.display = "none";
        }
    }
}

// const cart = new ShoppingCart();


// async function loadProducts() {
//     // Do something asynchronous, like fetching data or processing something
//     await loadProductsFromJSON(); // Wait for the products to be loaded
//     console.log("items laod done!");
// }

// async function addFunctionality() {
//     await loadProducts(); // Wait for the first function to complete
//     // Now you can execute addToCart() or any other logic that should happen after the first function
//     console.log("add to cart functionality done!");
//     addToCart();
// }

// addFunctionality(); // Call the second function to start the process

loadProductsFromJSON(); // Wait for the products to be loaded