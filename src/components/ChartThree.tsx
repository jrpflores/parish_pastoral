import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartThreeState {
  series: number[];
}
interface IChartProps {
  apexOptions?: ApexOptions,
  data?: any,
  series: number[]
}
const ChartThree: React.FC<IChartProps> = ({
  apexOptions,
  data,
  series
}) => {
  const [actualData, setActualData] = useState([])
  const [options, setOptions] = useState<any>({
    chart: {
      type: 'pie',
    },
    legend: {
      show: true,
      position: 'right',
    },
  
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false
      },
      background:{
        borderColor: "#fff",
        foreColor: "#fff"
      }
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: '100%'
          },
          dataLabels: {
            enabled: true
          },
          legend:{
            show: false,
            position: 'bottom'
          }
        },
      }
    ],
  })

  useEffect(() => {
    setOptions((prev: ApexOptions) => {
      return {...prev,colors: apexOptions?.colors}
    })
  }, [apexOptions?.colors])
  useEffect(() => {
    setOptions((prev: ApexOptions) => {
      return {...prev, labels: apexOptions?.labels}
    })
  }, [apexOptions?.labels])
  useEffect(() => {
    setActualData(data || [])
  }, [data])
  return (
    <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={series || []}
            type="pie"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-left justify-left gap-y-3">
        {
          actualData?.length > 0? 
          actualData?.map((value:any, index:number) => {
              return (
                <div className="w-full px-8 sm:w-1/2" key={index}>
                  <div className="flex w-full items-center">
                    <span className="mr-2 block h-3 w-full max-w-3 rounded-full" style={{backgroundColor: value?.color}}></span>
                    <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white" >
                      <span className='uppercase'> {value?.name} : <span className='font-bold'>{value?.value}</span></span>
                    </p>
                  </div>
                </div>
              )
            })
        : 
        <></>}
      </div>
    </div>
  );
};

export default ChartThree;
