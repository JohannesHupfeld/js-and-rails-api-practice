class Category {
  static all =[]

  constructor({name, id, products =[]}) { // blue curly brackets = destructing; I receive an object that has keys of name, id, and products and want to make variables out of it
    this.name = name
    this.id = id
    this.products = products
    Category.all.push(this) // all is a class property so category is attached 
  }

  static getAll() {  //getAll is a class property so it requires static
    return this.all
  }

  static findByName(name) {
    // return this.all.find(function(category) {category.name === name}) //ES5
    return this.all.find(category => category.name === name) // ES6
  }

  static findByid(id) {
    return this.all.find(category => category.id === id)
  }

  static findOrCreateBy(categoryObj) {
    return this.findByName(categoryObj.name) || new Category(categoryObj) // to use new we need the whole object not just name otherwise it get instantiated without a product property or id, therefore we destructured the constructor
  }

  static render() {
    ul().innerHTML += "<h1 id='categories-header'>Categories</h1>"
    this.all.forEach(cat => this.renderCategory(cat))
  }

  static renderCategory(category) {
    debugger
    const h4 = document.createElement("h4")
    const a = document.createElement("a")
    a.id = `category-${category.id}`
    a.innerText = category.name
    a.href = "#"
    a.addEventListener("click", (e) => renderProducts(e, category))
    h4.appendChild(a)
    ul().appendChild(h4)
  }

  renderProducts(cat) {
    return cat
  }


}