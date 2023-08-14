import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const TableOne = () => {
  const [jsonData, setJsonData] = useState<any>([]);
  const pageRef = useRef(false)
  const fetchData = async() => {
    try {
      const response = await fetch('/data/churches.json');
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if(pageRef.current === false) {
      fetchData()
      return () => {
        pageRef.current = true
      }
    }
    
  }, [])
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Survey Results Per Church
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Church
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total Respondents
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
             Date
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              &nbsp;
            </h5>
          </div>
        </div>
        {
          jsonData?.length > 0?
          jsonData?.map((value:any, index:number) => {
            return (
              <div key={index} className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-4">
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className="hidden text-black dark:text-white sm:block">{value?.parishName}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{value?.totalRespondents}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="">{value?.date}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <Link className='text-meta-3' to={`/results/${value?.parishCode}`}>View Summary</Link>
                </div>
            </div>
            )
          })
        :<>No Data yet</>
        }
       
        </div>
    </div>
  );
};

export default TableOne;
