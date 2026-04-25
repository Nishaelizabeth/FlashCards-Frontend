function FloatingImage({ src, alt, wrapperClassName, imageClassName }) {
  return (
    <div className={wrapperClassName}>
      <img src={src} alt={alt} className={imageClassName} />
    </div>
  )
}

export default FloatingImage
