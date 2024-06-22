window.onload = function () {
  var curCost = 0;
  var curName = 0;
  var curImage = 0; // Add curImage variable
  var cartItems = {}; // Use an object to store cart items
  var fx = 0,
    fy = 0;
  var tx = 0,
    ty = 0;
  var curItem = "";
  var item_list = document.querySelectorAll(".add-item");
  $delivery = $("input[name=delivery]:checked").val();
  var delivery = Number($delivery);
  document.getElementById("cost_delivery").innerHTML = delivery.toFixed(2);
  for (var i = 0; i < item_list.length; i++) {
    item_list[i].addEventListener("click", function (ev) {
      curCost = parseFloat(this.getAttribute("data-cost"));
      curName = this.getAttribute("data-name");
      curImage = this.getAttribute("data-image");
      var id = this.getAttribute("data-id");
      var x = $(this).position();
      fx = (window.innerWidth - 982) / 2 + 160 * (id - 1);
      (function () {
        mover_animator(fx, fy, tx, ty);
      })(
        setTimeout(function () {
          addItem(id, curCost, curName, curImage);
        }, 350)
      );
    });
  }

  $(document).on("click", ".cart-item-remove", function () {
    var itemId = $(this).parent(".cart-item").data("id");
    var itemCost = parseFloat($(this).parent(".cart-item").find(".cvalue").text());
    removeItem(itemId, itemCost);
  });

  $(document).on("click", ".cart-item-increase", function () {
    var itemId = $(this).parent(".cart-item").data("id");
    var itemCost = parseFloat($(this).parent(".cart-item").find(".cvalue").text());
    increaseItem(itemId, itemCost);
  });

  $(document).on("click", ".cart-item-decrease", function () {
    var itemId = $(this).parent(".cart-item").data("id");
    var itemCost = parseFloat($(this).parent(".cart-item").find(".cvalue").text());
    decreaseItem(itemId, itemCost);
  });

  function addItem(id, cost, name, image) {
    cost = parseFloat(cost); // Ensure cost is a number
    if (cartItems[id]) {
      cartItems[id].quantity += 1;
      var itemElement = document.querySelector("#item" + id + " .cart-item-quantity");
      itemElement.textContent = "Quantity: " + cartItems[id].quantity;
    } else {
      cartItems[id] = { cost: cost, name: name, image: image, quantity: 1 };
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
    updateItemCounter();
    document.getElementById("item" + id).classList.remove("hidden");
    toggleEmptyCart();
    addCost(cost);
  }

  function increaseItem(id, cost) {
    if (cartItems[id]) {
      cartItems[id].quantity += 1;
      var itemElement = document.querySelector("#item" + id + " .cart-item-quantity");
      itemElement.textContent = "Quantity: " + cartItems[id].quantity;
      addCost(cost);
      updateItemCounter();
    }
  }

  function decreaseItem(id, cost) {
    if (cartItems[id]) {
      cartItems[id].quantity -= 1;
      if (cartItems[id].quantity <= 0) {
        removeItem(id, cost * cartItems[id].quantity, true); // true to remove item
      } else {
        var itemElement = document.querySelector("#item" + id + " .cart-item-quantity");
        itemElement.textContent = "Quantity: " + cartItems[id].quantity;
        removeCost(cost);
        updateItemCounter();
      }
    }
  }

  function addCost(amount) {
    var oldCost = parseFloat(document.getElementById("cost_value").innerHTML);
    var newCost = oldCost + amount;
    var delivery = parseFloat($("input[name=delivery]:checked").val());
    var cartTotal = newCost + delivery;
    document.getElementById("cost_value").innerHTML = newCost.toFixed(2);
    document.getElementById("total-total").innerHTML = cartTotal.toFixed(2);
    $("#amount").val(cartTotal.toFixed(2));
  }

  function removeItem(id, cost, removeElement) {
    if (cartItems[id]) {
      if (!removeElement) {
        var totalItemCost = cartItems[id].quantity * cost;
        delete cartItems[id];
        document.querySelector("#item" + id).remove();
        removeCost(totalItemCost);
      } else {
        delete cartItems[id];
        document.querySelector("#item" + id).remove();
      }
      updateItemCounter();
    }
  }

  function removeCost(amount) {
    var oldCost = parseFloat(document.getElementById("cost_value").innerHTML);
    var newCost = oldCost - amount;
    if (isNaN(newCost) || newCost < 0) {
      newCost = 0.0;
    }
    var delivery = parseFloat($("input[name=delivery]:checked").val());
    var cartTotal = newCost + delivery;
    document.getElementById("total-total").innerHTML = cartTotal.toFixed(2);
    document.getElementById("cost_value").innerHTML = newCost.toFixed(2);
    $("#amount").val(cartTotal.toFixed(2));
  }

  function updateItemCounter() {
    var totalQuantity = 0;
    for (var id in cartItems) {
      totalQuantity += cartItems[id].quantity;
    }
    $("#items-counter").empty();
    document.getElementById("items-counter").innerHTML +=
      "<span class='animate'>" +
      totalQuantity +
      "<span class='circle'></span></span>";
  }

  function mover_animator(x1, y1, x2, y2) {
    var div = document.createElement("div");
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
    setTimeout(function () {
      $(div).remove();
      toggleEmptyCart();
    }, 200);
  }

  function toggleEmptyCart() {
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

  $("input").change(function () {
    $delivery = $(this).val();
    var total = parseFloat(document.getElementById("cost_value").innerHTML);
    var delivery = parseFloat($delivery);
    var cartTotal = total + delivery;
    document.getElementById("total-total").innerHTML = cartTotal.toFixed(2);
    $("#amount").val(cartTotal.toFixed(2));
    document.getElementById("cost_delivery").innerHTML = delivery.toFixed(2);
  });
};
