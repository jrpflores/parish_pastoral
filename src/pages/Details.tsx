import { Fragment, lazy, useEffect, useRef, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { useParams } from 'react-router-dom';
const ChartThree = lazy(() => import('../components/ChartThree'));
const Subcomittee  = lazy(() => import('../pages/Details/SubComittee'));
import Others from './Details/Others';
import { Listbox, Tab, Transition } from '@headlessui/react';
const Details = () => {
    const {code} = useParams()
    const pageRef = useRef(false)
    const [data, setData] = useState<any>([])
    const [selected, setSelected] = useState<any>({
        id: 1,
        name: "worship"
    })
    const ref = useRef(null);
    const fetchData = async() => {
        try {
            const response = await fetch(`/data/churches/${code?.toLowerCase()}.json`);
            const data = await response.json();
            setData(data);
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
    const handleScroll = () => {
        ref?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  return (
    <>
      <Breadcrumb pageName={`${code}`} />
      <div className="mx-auto max-w-270">
            <div>
                <h1 className='text-center text-2xl'>DIOCESE OF SAN CARLOS</h1>
                <h1 className='mt-2.5 text-center font-bold'>Mission Station/Parish: {data?.parishName}</h1>
                <h1 className='mt-2.5 text-center font-bold'>Total Respondents: {data?.totalRespondents}</h1>
                <h1 className='text-center mt-2.5'>Date: {data?.date}</h1>
            </div>
            <div className='mt-2.5' ref={ref}>
                <p className="text-xl">Respondents</p>
                <div className='mt-1.5'>
                    <ChartThree apexOptions={{
                            colors: data?.responseDents?.map( (d:any) => d.color),
                            labels: data?.responseDents?.map( (d:any) => d.name)
                            }} 
                            series={data?.responseDents?.map( (d:any) => d.value)}  
                            data={data?.responseDents } />
                </div>
            </div>
            <div  className="w-72 mt-10 mr-auto bg-white sticky top-16 p-4" >
            {/* style={{
                right: '23px',
                bottom: '53px',
                background: 'white',
                padding:  '10px'
            }} */}
                <div>Select Type: </div>
                <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate uppercase">{selected?.id}. {selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {data?.westoy?.map((value:any, index:number) => (
                            <Listbox.Option
                            onClick={()=>{
                                handleScroll()
                            }}
                            key={index}
                            className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                            }
                            value={{name: value?.type, id: index+1}}
                            >
                            {({ name }:any) => (
                                <>
                                <span
                                    className={`block truncate uppercase ${
                                        name === value?.type ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                {index+1}. {value?.type}
                                </span>
                                {name === value?.type ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    </span>
                                ) : null}
                                </>
                            )}
                            </Listbox.Option>
                        ))}
                        </Listbox.Options>
                    </Transition>
                    </div>
                </Listbox>
            </div>
            <div>
            {
                data?.westoy?.filter( (x:any) => x.type === selected?.name)?.map((value:any, index:number) => {
                    return (
                        <div className='mt-10 mb-10' key={index}>
                            <p className="text-xl font-bold uppercase">{selected?.id}. <span className='uppercase'>{`(${value?.type})`}</span> {value?.title ? value.title : `Aduna ba'y sub-committees ang inyong PAROKYA?`}</p>
                            <div className='mt-8'>
                                <Subcomittee data={value?.details?.subcomittee} />
                                <Others data={value?.details?.others} />
                            </div>
                        </div>
                    )
                })
            }
            </div>
      </div>
    </>
  );
};

export default Details;
