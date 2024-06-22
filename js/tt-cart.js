window.onload = function () {
  var curCost = 0;
  var curName = 0;
  var curImage = 0; // Add curImage variable
  var cartItems = {}; // Use an object to store cart items
  var cindex = 0; // Reintroduce cindex
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
      curCost = this.getAttribute("data-cost");
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
    var itemCost = $(this).parent(".cart-item").find(".cvalue").text();
    removeItem(itemId, itemCost);
    this.parentNode.outerHTML = "";
    toggleEptyCart();
    var curCounter = $("#items .cart-item").length;
    $("#items-counter").empty();
    document.getElementById("items-counter").innerHTML +=
      "<span class='animate'>" +
      curCounter +
      "<span class='circle'></span></span>";
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
      cindex++;
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
    $("#items-counter").empty();
    var curCounter = $("#items .cart-item").length;
    document.getElementById("items-counter").innerHTML +=
      "<span class='animate'>" +
      curCounter +
      "<span class='circle'></span></span>";
    document.getElementById("item" + id).classList.remove("hidden");
    toggleEptyCart();
    addCost(cost);
  }

  function increaseItem(id, cost) {
    if (cartItems[id]) {
      cartItems[id].quantity += 1;
      var itemElement = document.querySelector("#item" + id + " .cart-item-quantity");
      itemElement.textContent = "Quantity: " + cartItems[id].quantity;
      addCost(cost);
    }
  }

  function decreaseItem(id, cost) {
    if (cartItems[id]) {
      cartItems[id].quantity -= 1;
      if (cartItems[id].quantity <= 0) {
        delete cartItems[id];
        document.querySelector("#item" + id).remove();
      } else {
        var itemElement = document.querySelector("#item" + id + " .cart-item-quantity");
        itemElement.textContent = "Quantity: " + cartItems[id].quantity;
      }
      removeCost(cost);
    }
  }

  function addCost(amount) {
    var oldcost = parseFloat(document.getElementById("cost_value").innerHTML);
    var newcost = oldcost + amount;
    var delivery = parseFloat($("input[name=delivery]:checked").val());
    var carttotal = newcost + delivery;
    document.getElementById("cost_value").innerHTML = newcost.toFixed(2);
    document.getElementById("total-total").innerHTML = carttotal.toFixed(2);
    $("#amount").val(carttotal.toFixed(2));
  }

  function removeItem(id, cost) {
    cost = parseFloat(cost); // Ensure cost is a number
    if (cartItems[id]) {
      cartItems[id].quantity -= 1;
      if (cartItems[id].quantity <= 0) {
        delete cartItems[id];
        document.querySelector("#item" + id).remove();
      } else {
        var itemElement = document.querySelector("#item" + id + " .cart-item-quantity");
        itemElement.textContent = "Quantity: " + cartItems[id].quantity;
      }
      removeCost(cost);
    }
  }

  function removeCost(amount) {
    var oldcost = parseFloat(document.getElementById("cost_value").innerHTML);
    var newcost = oldcost - amount;
    if (isNaN(newcost) || newcost < 0) {
      newcost = 0.0;
    }
    var delivery = parseFloat($("input[name=delivery]:checked").val());
    var carttotal = newcost + delivery;
    document.getElementById("total-total").innerHTML = carttotal.toFixed(2);
    document.getElementById("cost_value").innerHTML = newcost.toFixed(2);
    $("#amount").val(carttotal.toFixed(2));
  }

  function mover_animator(x1, y1, x2, y2) {
    var div = document.createElement("div");
    div.className = "mover_animator " + cindex;
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
        300,
        function () {
          // Move cost calculation to addItem
        }
      );
    setTimeout(function () {
      $(div).remove();
      toggleEptyCart();
    }, 200);
  }

  function toggleEptyCart() {
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
    var carttotal = total + delivery;
    document.getElementById("total-total").innerHTML = carttotal.toFixed(2);
    $("#amount").val(carttotal.toFixed(2));
    document.getElementById("cost_delivery").innerHTML = delivery.toFixed(2);
  });
};
