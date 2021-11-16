class CategoryApi {
  static fetchCategories () {
    fetch('http://localhost:3000/categories')
        .then(resp => resp.json())
        .then(json => json.forEach(catObj => Category.findOrCreateBy(catObj))) // passing the current object say clothing to the constructor, the constructor will decompose it into three variables name, id and porducts and then set them up on the object
        .catch(handleError)
  }

  static handleError(error) {
    console.log(error)
  }
}
