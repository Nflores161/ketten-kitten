import React, { useState, useEffect } from 'react'
import { commerce } from '../lib/commerce'
const Checkout = ( {cart} ) => {
  const [checkOutToken, setCheckOutToken] = useState({})
  const [shippingCountries, setShippingCountries] = useState({})
  const [shippingSubdivisions, setShippingSubdivisions] = useState({})
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')
  const [shippingCountry, setShippingCountry] = useState('')

  const [formData, setFormData] = useState({
    checkoutToken: {},
    // Customer details
    firstName: '',
    lastName: '',
    email: '',
    // Shipping details
    shippingName: '',
    shippingStreet: '',
    shippingCity: '',
    shippingStateProvince: '',
    shippingPostalZipCode: '',
    shippingCountry: '',
    // Payment details
    cardNum: '',
    expMonth: '',
    expYear: '',
    ccv: '',
    billingPostalZipcode: '',
    // Shipping and fulfillment data
    shippingCountries: {},
    shippingSubdivisions: {},
    shippingOptions: [],
    shippingOption: '',
  });

  const generateCheckoutToken = () => {
    
    if (cart.line_items.length) {
      commerce.checkout.generateToken(cart.id, { type: 'cart' })
        .then((token) => {
          setCheckOutToken(token)
        })
        .then(() => {
          fetchShippingCountries(checkOutToken.id)
        })
        .catch((error) => {
          console.log('There was an error in generating a token', error);
        })
    }
  }

  const fetchShippingCountries = (checkOutTokenId) => {
    commerce.services.localeListShippingCountries(checkOutTokenId)
      .then((countries) => {
        setShippingCountries(countries.countries)
        console.log(shippingCountries)
      }).catch((error) => {
        console.log('There was an error fetching a list of shipping countries', error);
      });
  }

  const fetchSubdivisions = (countryCode) => {
    commerce.services.localeListSubdivisions(countryCode)
      .then((subdivisions) => {
        setShippingSubdivisions(subdivisions.subdivisions)
        console.log(shippingSubdivisions)
      }).catch((error) => {
        console.log('There was an error fetching the subdivisions.', error);
      });
  }

  const fetchShippingOptions = (checkoutTokenId, country, stateProvince = null) => {
    commerce.checkout.getShippingOptions(checkoutTokenId, 
      {country: country
      }).then((options) => {
        const shippingOption1 = options[0] || null;
        setShippingOptions(options)
        setShippingOption(shippingOption1)
      }).catch((error) => {
        console.log('There was an error fetching the shipping methods', error)
      })
  }

  //Generate token on page load
  useEffect(() => {
    generateCheckoutToken();
    // fetchShippingCountries();
    fetchSubdivisions();
    fetchShippingOptions(checkOutToken.id, shippingCountry);
  }, [shippingCountry]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const renderCheckoutForm = () => {
    return (
      <div>
        <form>
          <h4>Customer information</h4>

          <label htmlFor="firstName">First name</label>
          <input onChange={handleChange} type="text" value={formData.firstName} name="firstName" placeholder="Enter your first name" required />

          <label htmlFor="lastName">Last name</label>
          <input onChange={handleChange} type="text" value={formData.lastName} name="lastName" placeholder="Enter your last name" required />

          <label htmlFor="email">Email</label>
          <input onChange={handleChange} type="text" value={formData.email} name="email" placeholder="Enter your email" required />

          <h4>Shipping details</h4>

          <label htmlFor="shippingName">Full name</label>
          <input onChange={handleChange} type="text" value={formData.shippingName} name="shippingName" placeholder="Enter your shipping full name" required />

          <label htmlFor="shippingStreet">Street address</label>
          <input onChange={handleChange} type="text" value={formData.shippingStreet} name="shippingStreet" placeholder="Enter your street address" required />

          <label htmlFor="shippingCity">City</label>
          <input onChange={handleChange} type="text" value={formData.shippingCity} name="shippingCity" placeholder="Enter your city" required />

          <label htmlFor="shippingPostalZipCode">Postal/Zip code</label>
          <input onChange={handleChange} type="text" value={formData.shippingPostalZipCode} name="shippingPostalZipCode" placeholder="Enter your postal/zip code" required />


          {/* {SHIPPING SELECT MENU} */}
          <label className="checkout__label" htmlFor="shippingCountry">Country</label>
            <select
              value={shippingCountry}
              name="shippingCountry"
              className="checkout__select"
            >
              <option disabled>Country</option>
              {
                 Object.keys(shippingCountries).map((index) => {
                  return (
                    <option value={index} key={index}>{shippingCountries[index]}</option>
                  )
                })
              };
            </select>

            <label className="checkout__label" htmlFor="shippingStateProvince">State/province</label>
            <select 
              value={formData.shippingStateProvince}
              name="shippingStateProvince"
              className="checkout__select"
            >
              <option className="checkout__option" disabled>State/province</option>
              {
                Object.keys(shippingSubdivisions).map((index) => {
                  return (
                    <option value={index} key={index}>{shippingSubdivisions[index]}</option>
                  );
                })
              };
            </select>

            <label className="checkout__label" htmlFor="shippingOption">Shipping method</label>
            <select
              value={shippingOption.id}
              name="shippingOption"
              className="checkout__select"
            >
              <option className="checkout__select-option" disabled>Select a shipping method</option>
              {
                shippingOptions.map((method, index) => {
                  return (
                    <option className="checkout__select-option" value={method.id} key={index}>{`${method.description} - $${method.price.formatted_with_code}` }</option>
                  );
                })
              };
            </select>

          <h4>Payment information</h4>

          <label htmlFor="cardNum">Credit card number</label>
          <input onChange={handleChange} type="text" name="cardNum" value={formData.cardNum} placeholder="Enter your card number" />

          <label htmlFor="expMonth">Expiry month</label>
          <input onChange={handleChange} type="text" name="expMonth" value={formData.expMonth} placeholder="Card expiry month" />

          <label htmlFor="expYear">Expiry year</label>
          <input onChange={handleChange} type="text" name="expYear" value={formData.expYear} placeholder="Card expiry year" />

          <label htmlFor="ccv">CCV</label>
          <input onChange={handleChange} type="text" name="ccv" value={formData.ccv} placeholder="CCV (3 digits)" />

          <button>Confirm order</button>
        </form>
      </div>
    );
  };




  return (
    <div id='checkout'>Checkout
      <div>
        {renderCheckoutForm()}
      </div>
    </div>
  )
}

export default Checkout