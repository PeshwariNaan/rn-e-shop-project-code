// This is the structure of the orders we will be storing for each customer
 import moment from "moment"
class Order {
    constructor(id, items, totalAmount, date) {
        this.id = id  // Different than the product id - this is specific to orders
        this.items = items
        this.totalAmount = totalAmount
        this.date = date
    }

    get readableDate() {
        // return this.date.toLocaleDateString('en-EN', { //Android does not support this so we use the moment module: npm install --save moment
        //     year: 'numeric',
        //     month: 'long',
        //     day: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit'
        // })
     return moment(this.date).format('MMMM Do YYYY, hh:mm');
}

}
export default Order