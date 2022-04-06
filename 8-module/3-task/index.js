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
      if (this.cartItems.some(item => product.id == item.product.id)) {
        for (let item in this.cartItems) {
          if (product.id == this.cartItems[item].product.id) {
            this.cartItems[item].count = this.cartItems[item].count + 1;
          }
        }
      } else {
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

    this.cartItems = this.cartItems.map((item) => {

      if (item.product.id == productId) {
        item.count = item.count + amount;
      }

      return item;
    });

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

