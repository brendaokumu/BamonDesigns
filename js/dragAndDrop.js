function addDnDHandlers() {         //user can pickup the image from all heels page and drag onto the shoppingcart
  var heelimages = document.getElementsByClassName("productarticlewide");         //getting all images

  var shoppingcartdropzone = document.getElementById("shoppingcart");          //getting a ref to the shoppingcart to drop your heel images

  //initialize the cart
  var shoppingcart = document.querySelectorAll("#shoppingcart ul")[0];          //selecting child of selector shopping cart which is ul

  //create a constructor function for the cart object
  var Cart = (function () {
    this.heels = new Array();         //create an array which will contain all the heels added during drag and drop
  });

  //create a constructor function for heel object
  var Heel = (function (id, price) {
    this.heelId = id;
    this.price = price;
  });

  var currentCart = null;         //contains actual cart contents coming from local storage
  currentCart = JSON.parse(localStorage.getItem('cart'));        //check if localStorage already have something stored with id cart then parse it and save to currentCart
  if (!currentCart) {         //if current cart doesn't exist yet, create an empty cart with the function createEmptyCart
    createEmptyCart();
  }

  UpdateShoppingCartUI();
  currentCart.addHeel = function (heel) {
    currentCart.heels.push(heel);

    localStorage.setItem('cart', JSON.stringify(currentCart));          //override waht's in localStorage cart with stringify currentCart
  }

  //for loop which loops through the heels images and on each image I will attach an addeventlistener to listen for the drag start event.And when it fires, the function (ev) is going to execute.
  for (var i = 0; i < heelimages.length; i++) {
    heelimages[i].addEventListener("dragstart", function (ev) {
      ev.dataTransfer.effectAllowed = 'copy';
      ev.dataTransfer.setData("Text", this.getAttribute("id"));
    }, false);          //set data onto the datatransfer object, key is text and the data is the id of the heelimage am dragging thus when dropping the image will know which image was selected.
  }

    //attach dragover event onto the shoppingcartdropzone and if there's a default event being fired, cancel that and dropEffect should be copy.
    shoppingcartdropzone.addEventListener("dragover", function (ev) {
      if (ev.preventDefault)
          ev.preventDefault();
      ev.dataTransfer.dropEffect = "copy";
      return false;
    }, false);

    //implementing the actual dropping of an image.
    shoppingcartdropzone.addEventListener("drop", function (ev) {
      if (ev.stopPropagation)
          ev.stopPropagation();

      var heelId = ev.dataTransfer.getData("Text");         //key Text is the heelId selected from searching the element in the DOM
      var element = document.getElementById(heelId);

      addHeelToShoppingCart(element, heelId);         //need a visual representation; defined function below
      ev.stopPropagation();
      return false;
    }, false);

    function addHeelToShoppingCart(item, id) {
      var price = item.getAttribute("data-price");

      var heel = new Heel(id, price);
      currentCart.addHeel(heel);

      UpdateShoppingCartUI(); 
    }

    function createEmptyCart() {
      localStorage.clear();
      localStorage.setItem("cart", JSON.stringify(new Cart()));
      currentCart = JSON.parse(localStorage.getItem("cart"));
    }

    function UpdateShoppingCartUI() {
      shoppingcart.innerHTML = "";
      for (var i = 0; i < currentCart.heels.length; i++) {
        var liElement = document.createElement('li');
        liElement.innerHTML = currentCart.heels[i].heelId + " " + currentCart.heels[i].price;
        shoppingcart.appendChild(liElement);
      }
    }
  }
