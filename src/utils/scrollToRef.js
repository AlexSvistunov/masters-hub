function scrollToRef(ref) {
  const y = ref.current.getBoundingClientRect().top + window.scrollY
  console.log(ref.current.getBoundingClientRect())
  window.scrollTo({
    top: y,
    behavior: 'smooth'
  })

  return y

}

export default scrollToRef