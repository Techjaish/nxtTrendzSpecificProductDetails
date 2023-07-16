// Write your code here
import './index.css'

const ProductItemDetails = props => {
  const {productItem} = props
  console.log(productItem)
  const {
    title,
    description,
    similarProducts,
    brand,
    imageUrl,
    rating,
    price,
  } = productItem
  console.log(similarProducts)
  return (
    <div className="product-container1">
      <img src={imageUrl} alt="product" className="thumbnail" />
      <div className="content-container">
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
        <p className="brand">{description}</p>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItemDetails
