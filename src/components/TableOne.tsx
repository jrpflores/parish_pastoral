import { deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { db, parishCollectionRef } from '../config/firebase';
import { SurveyContext } from '../context/SurveyProvider';
import { templateSurvey } from '../config/template';
import ConfirmationModal from './ConfirmationModal';

const TableOne = () => {
  const [jsonData, setJsonData] = useState<any>([]);
  const {setForm} = useContext(SurveyContext)
  const pageRef = useRef(false)
  const toastId = useRef<any>('')
  const navigate = useNavigate()
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false)
  const [toDelete, setToDelete] = useState<string>('')
  const fetchData = async() => {
    toastId.current = toast.loading('Fetching data ...')
    try {
        const data = await getDocs(parishCollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            parishCode: doc.id,
        }));
        setJsonData(filteredData)
        toast.success('Data loaded', { id: toastId.current})
    } catch (err) {
        console.error(err);
        toast.error('Error fetching the data. Please reload the browser', { id: toastId.current})
    }
  }
  const handleDelete = async (id:any) => {
      setToDelete(id)
      setIsDeleteConfirm(true)
  };
  const onDelete = async () => {
        toastId.current = toast.loading('Fetching data ...')
        try {
            const docData = doc(db, "parish", toDelete);
            await deleteDoc(docData);
            const newData = jsonData?.filter((x:any) => x.parishCode !== toDelete)
            setJsonData(newData)
            toast.success('Successfully deleted', { id: toastId.current})
        } catch (err) {
            console.error(err);
            toast.error('Error deleting the data. Please try again', { id: toastId.current})
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
      <h4 className="flex mb-6 text-xl font-semibold text-black dark:text-white">
        Survey Results Per Parish
      </h4>
        <div className="flex flex-row-reverse mb-2">
            <button type="button" onClick={() => {
              setForm(templateSurvey)
              navigate('/add-survey-stats')
            }} className="right-0 justify-center rounded bg-primary py-1 px-3  text-gray">Add</button>
        </div>
      
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
                  <p className="text-black dark:text-white sm:block">{value?.parishName}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{value?.totalRespondents}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="">{value?.date}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                <button title='View Summary' type="button" className='text-meta-3 font-bold hover:text-primary' onClick={() => {
                    setForm(value)
                    navigate(`/results/${value?.parishCode}`);
                  }}>
                    <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9801)">
                      <path
                        d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
                        fill=""
                      />
                      <path
                        d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9801">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  </button>
                  <button title="Update" onClick={() => {
                      setForm(value)
                      navigate(`/add-survey-stats/${value?.parishCode}`)
                  }} className="hover:text-primary ml-2 text-meta-3 font-bold">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"  
                      width="18"
                      height="18">
                      <path strokeLinecap="round"strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  <button title='Remove Survey' onClick={() => {
                      handleDelete(value?.parishCode)
                  }} className="hover:text-primary ml-2 text-danger font-bold">
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                        fill=""
                      />
                      <path
                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                        fill=""
                      />
                      <path
                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                        fill=""
                      />
                      <path
                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
            </div>
            )
          })
        :<>No Data yet</>
        }
       <ConfirmationModal title='Delete Confirmation' message='Are you sure you want to delete this?' isOpen={isDeleteConfirm} onClose={()=>{
          setIsDeleteConfirm(false)
          setToDelete('')
       }}
       onSave={()=>{
          onDelete()
          setIsDeleteConfirm(false)
       }} />
        </div>
    </div>
  );
};

export default TableOne;
