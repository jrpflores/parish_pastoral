import { useEffect, useRef, useState } from 'react';
import ChartThree from '../../components/ChartThree';

const Factors = ({
    data = []
}) => {

  return (
    <>
       <div className='mb-8'>
                        <p className="text-lg font-bold">Factors</p>
                        <div className='mt-6 mb-6'>
                            <ChartThree  apexOptions={{
                            colors: data?.map( (d:any) => d.color),
                            labels: data?.map( (d:any) => d.name?.toUpperCase())
                            }} 
                            series={data?.map( (d:any) => d.value)}  
                            data={ data } />
                        </div>
                    </div>
    </>
  );
};

export default Factors;
