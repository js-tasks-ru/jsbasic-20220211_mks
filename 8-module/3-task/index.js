export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.cartItems = [];
    this.products = [];
  }

  addProduct(product) {

    if (!product) {
      return
    }

    let tempProduct = {
      product: product,
      count: 1,
    }

    this.products.push(product);

    if (this.cartItems.length > 0) {
      if (this.cartItems.some(item => JSON.stringify(product) == JSON.stringify(item.product))) {
        for (let item in this.cartItems) {
          if (JSON.stringify(product) == JSON.stringify(this.cartItems[item].product)) {
            this.cartItems[item].count = this.cartItems[item].count + 1;
          }
        }
      }
      else {
        this.cartItems.push(tempProduct);
      }
    }

    if (this.cartItems.length == 0) {
      this.cartItems.push(tempProduct);
    }

    for (let cartItem of this.cartItems) {
      this.onProductUpdate(cartItem);
    }
 
  }

  updateProductCount(productId, amount) {

    console.log(this.cartItems);

    this.cartItems = this.cartItems.map(updateCountsCartItems);

    function updateCountsCartItems(tempItem) {

      if (tempItem.product.id == productId) {
        tempItem.count = tempItem.count + amount;
      }

      console.log(tempItem);

      return tempItem;
    }
    
    console.log(this.cartItems);

    for (let item in this.cartItems) {
      if (this.cartItems[item].count == 0) {
        this.cartItems.splice(this.cartItems.indexOf(this.cartItems[item]), 1);
      }
    }

    console.log(this.cartItems);

  }

  isEmpty() {
    for (let item in this.cartItems) {
      return false;
    }
    return true;
  }

  getTotalCount() {
    let totalCount = 0;
    
    for (let item in this.cartItems) {
      totalCount = this.cartItems[item].count + totalCount;
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    
    console.log(this.products);

    for (let item in this.cartItems) {
      totalPrice = this.cartItems[item].product.price * this.cartItems[item].count + totalPrice;
    }
    
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

