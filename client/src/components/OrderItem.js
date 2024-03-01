import React from 'react'

export default function OrderItem(props) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={props.image} className="img-fluid rounded-start" alt={props.name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-name">{props.name}</h5>
            <p className="card-text">Price: ${props.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
