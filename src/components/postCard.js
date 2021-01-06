import React, { Component } from "react";
import { Link } from "gatsby"
import Tags from "./tag"
import Ribbon from "../components/ribbon"

function render(props) {
  const {
    title,
    variants: [productVariant],
    priceRange: { minVariantPrice },
  } = props.node

  const img = props.node.images[0].localFile.childImageSharp.fluid.srcWebp;
  const available = props.available == 2;
  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(productVariant.price)

  return (
    <article
      className={`post-card ${props.count % 3 === 0 && `post-card-large`} ${
        props.postClass
      } with-image`}
      style={
        {
          backgroundImage: `url(${img})`,
        }
      }
    >
        {
          [
            <ContentWithImage props={props}/>,
            <Ribbon available={available}
              price={price}
              name={title}
            />
          ]
        }
    </article>
  )
}

class ContentNoImage extends Component {
  render() {
    const {
      title,
      tags,
      createdAt,
      description,
      handle
    } = this.props.node

    return (
      <div className="post-card-content">
        <div>
        <Tags tags={tags}/>
        </div>
        <div>
        <Link to={`/product/${handle}/`} className="post-card-link">
          <h2 className="post-card-title">
            {title}
          </h2>
        </Link>
        </div>
        <div className="post-card-date">
        {createdAt}
        </div>
        <div className="post-card-body">
        {description}
        </div>
        <div>
        <Link to={`/product/${handle}/`} className="post-card-link post-card-readmore">
          {
            description
              ?("Read more")
              :(null)
          }
        </Link>
        </div>
      </div>
    );
  }
}

class ContentWithImage extends Component {
  render() {
    const{props}=this.props;
    return (
      <Link to={`/product/${props.node.handle}/`} className="post-card-link">
        <div className="post-card-content">
          <h2 className="post-card-title">
            {props.node.title}
          </h2>
        </div>
      </Link>
    );
  }
}

export default render