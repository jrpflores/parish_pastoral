import { lazy, useEffect, useRef, useState } from 'react';
const ChartThree = lazy(() => import('../../components/ChartThree'));
const Others = ({
    data = []
}) => {

    return (
        <>
            {
                data?.map((value:any, index) => {
                    return (
                        <div key={index} className='mb-8'>
                            <p className="text-lg font-bold">{value?.title}</p>
                            <div className='mt-6 mb-6 ml-5'>
                                {
                                    value?.questions?.map((q:any, qindex:number) => {
                                        return (
                                            <div className='mb-5 ml-2.5' key={qindex}>
                                                  <p className="text-base">{q?.title}</p>
                                                  <div className='mt-2.5'>
                                                  <ChartThree key={qindex} apexOptions={{
                                colors: q?.answers?.map( (d:any) => d.color),
                                labels: q?.answers?.map( (d:any) => d.name?.toUpperCase())
                                }} 
                                series={q?.answers?.map( (d:any) => d.value)}  
                                data={q?.answers } />
                                                  </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
      );
};

export default Others;
