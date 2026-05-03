import React, { useState } from 'react'
import fallbackImage from 'figma:asset/045041457457f607eca32c5c5e7a7a719b2695c7.webp';

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <img
      src={fallbackImage}
      alt={alt || "Image not available"}
      className={className}
      style={style}
      loading="lazy"
      {...rest}
      data-original-url={src}
    />
  ) : (
    <img src={src} alt={alt} className={className} style={style} loading="lazy" {...rest} onError={handleError} />
  )
}