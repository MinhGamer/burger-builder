class Order {
  constructor(_id, _customer, _ingredients, _price) {
    this.id = _id; // string

    // customer: {
    // address: string
    // email: string
    // name: string
    // }
    this._customer = _customer;

    // ingredients: {
    //  bacon: number,
    // cheese: number,
    // salad: number,
    // meat: number
    // }
    this.ingredients = _ingredients;

    this.price = _price; // number
  }
}

export default Order;
