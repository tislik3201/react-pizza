import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="138" cy="125" r="125" /> 
    <rect x="-3" y="265" rx="10" ry="10" width="280" height="31" /> 
    <rect x="0" y="314" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="418" rx="10" ry="10" width="95" height="30" /> 
    <rect x="128" y="418" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton