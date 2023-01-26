import React from 'react'
import FilterContainer from '../containers/FilterContainer'

const FilterOptions = () => {
  return (
    <div className='filter'>
        <FilterContainer filter='SHOW_ALL'>Mostrar todos</FilterContainer>
        <FilterContainer filter='SHOW_COMPLETED'>Mostrar completadas</FilterContainer>
        <FilterContainer filter='SHOW_PENDING'>Mostrar pendientes</FilterContainer>
    </div>
  )
}

export default FilterOptions