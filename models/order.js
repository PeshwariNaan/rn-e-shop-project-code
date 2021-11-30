// This is the structure of the orders we will be storing for each customer

class Order {
    constructor(id, items, totalAmount, date) {
        this.id = id  // Different than the product id - this is specific to orders
        this.items = items
        this.totalAmount = totalAmount
        this.date = date
    }
}
export default Order