class ProductApi {

  // constructor(baseUrl) {
  //     this.baseUrl = `${baseUrl}/products`
  // }
  static baseUrl = `${baseUrl}/products`

  static fetchProducts() {
      fetch(this.baseUrl)
      .then(resp => resp.json())
      .then(json => json.forEach(prodObj => {
          Product.findOrCreateBy(prodObj)
          // product.render()
      }))
      // .then(() => Category.render())
      .catch(this.handleError)
  }

  static handleError(err) {
    alert(err)
  }

  static handleSubmit(e) {
      e.preventDefault()
      const data = {
          name: productName().value,
          description: productDescription().value,
          price: productPrice().value,
          category_id: productSelectCategory().value
      }
      fetch(ProductApi.baseUrl, {
          method: 'POST',
          headers: {
              "Content-Type": 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(resp => resp.json())
      .then(json => {
          let prod = new Product(json)
          productForm().reset ()
          prod.render()
      })
  }

  static handleFetchUpdate(e) {
    const data = {
        id: e.target.dataset.id,
        name: e.target.parentElement.querySelector("#product-name").value,
        price: e.target.parentElement.querySelector("#product-price").value,
        description: e.target.parentElement.querySelector("#product-description").value
    }
    fetch(`http://localhost:3000/products/${data.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => {
      let prod = Product.findById(json.id)
      let updatedProduct = prod.update(json)
      updatedProduct.replaceElement(e.target.parentElement)
    })
    .catch(err => alert(err))
  }

  static handleDelete = (e) => {
    fetch(`http://localhost:3000/products/${e.target.dataset.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(json => {
        e.target.parentNode.remove()
        let prod = Product.findById(parseInt(e.target.dataset.id))
        let index = Product.all.indexOf(prod)
        Product.all.splice(index, 1)
        // remove the obj from out collection of products 
        alert(json.message)
    })
    .catch(this.handleError)  }
}