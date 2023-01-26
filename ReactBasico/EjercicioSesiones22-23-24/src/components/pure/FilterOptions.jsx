import React from 'react'

import FilterContainer from '../containers/FilterContainer'

const FilterOptions = () => {
  return (
    <div className='filter'>
        {/* Filter containers */}
        <FilterContainer filter='SHOW_ALL'>
            Mostrar todo
        </FilterContainer>
        <FilterContainer filter='SHOW_COMPLETED'>
            Mostrar completadas
        </FilterContainer>
        <FilterContainer filter='SHOW_ACTIVE'>
            Mostrar pendientes
        </FilterContainer>
    </div>
  )
}

export default FilterOptions