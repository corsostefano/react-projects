
//cuadrado ({hijo(lo que contiene si es x u o, actualización, indice)})

export const Square = ({children, updateBoard, index, isSelected}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = () => {
      updateBoard(index)
    }
  
    return(
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }