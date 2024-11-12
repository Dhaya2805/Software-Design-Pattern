import React from 'react';
import {ChartsHeader, LineChart} from '../../Components'

const Analysis = () => {
  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <ChartsHeader category="Analysis" title="Inflation Rate" />
      <div className='w-full '>
          <LineChart/>
      </div>
    </div>
  )
}

export default Analysis