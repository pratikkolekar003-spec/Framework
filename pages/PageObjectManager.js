const LoginPage = require("./LoginPage");
const DashboardPage = require("./DashboardPage");
const AddToCartPage = require("./AddToCartPage");
const CartPage = require("./CartPage");


class PageObjectManager {
    constructor(page) {
        this.page = page;
        this.pages = new Map();
    }
    getPage(PageClass) {
        if (!this.pages.has(PageClass)) {
            this.pages.set(PageClass, new PageClass(this.page));
        }
        return this.pages.get(PageClass);
    }
    
    getLoginPage() {
        return this.getPage(LoginPage);
    }
    getDashboardPage() {
        return this.getPage(DashboardPage);
    }
    getAddToCartPage() {
        return this.getPage(AddToCartPage);
    }
    getCartPage() {
        return this.getPage(CartPage);
    }
}
module.exports = PageObjectManager;