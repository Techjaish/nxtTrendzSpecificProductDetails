import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductItemDetails from '../ProductItemDetails'
import AllProductsSection from '../AllProductsSection'
import PrimeDealsSection from '../PrimeDealsSection'

import Header from '../Header'

import './index.css'

const apiStatus = {
  noactive: 'NOT_ACTIVE',
  active: 'ACTIVE',
  inProgress: 'IN_PROGRESS',
}

class Products extends Component {
  state = {
    activeId: 1,
    actived: apiStatus.noactive,
    productItem: {},
  }

  getItemDetail = async () => {
    const {activeId} = this.state
    const Token = Cookies.get('jwt_token')
    console.log(Token)
    const url = `https://apis.ccbp.in/products/${activeId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    const responseData = await response.json()
    const formData = {
      id: responseData.id,
      title: responseData.title,
      description: responseData.description,
      similarProducts: responseData.similar_products,
      brand: responseData.brand,
      imageUrl: responseData.image_url,
      rating: responseData.rating,
      price: responseData.price,
    }
    console.log(formData)
    this.setState({productItem: formData, actived: apiStatus.active})
  }

  updateProduct = id => {
    console.log(id)
    this.setState(
      {
        activeId: id,
      },
      this.getItemDetail,
    )
  }

  renderProductsItem = () => (
    <>
      <Header />
      <div className="product-sections">
        <PrimeDealsSection />
        <AllProductsSection updateProduct={this.updateProduct} />
      </div>
    </>
  )

  renderSelectedItem = () => {
    const {productItem} = this.state
    console.log(this.state)

    return (
      <div className="product-main-container">
        <ProductItemDetails productItem={productItem} />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="primedeals-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {actived} = this.state
    console.log(this.state)

    switch (actived) {
      case apiStatus.noactive:
        return this.renderProductsItem()
      case apiStatus.active:
        return this.renderSelectedItem()
      case apiStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default Products
