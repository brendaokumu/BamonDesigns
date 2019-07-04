function addDnDHandlers() {         //user can pickup the image from all heels page and drag onto the shoppingcart
  var heelimages = document.getElementsByClassName("productarticlewide");         //getting all images

  var shoppingcartdropzone = document.getElementById("shoppingcart");          //getting a ref to the shoppingcart to drop your heel images

  //initialize the cart
  var shoppingcart = document.querySelectorAll("#shoppingcart ul")[0];          //selecting child of selector shopping cart which is ul

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
      var html = id + " " + item.getAttribute("data-price");          // try to fetch the price of the element through dataprice with the string

      var liElement = document.createElement('li');
      liElement.innerHTML = html;
      shoppingcart.appendChild(liElement); //append li child onto above shopping cart function through changing the li's html using inner.html to html
    }
  }
