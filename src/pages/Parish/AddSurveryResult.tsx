import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddSurveyTable from "./AddSuveryTable";
import { SurveyContext } from "../../context/SurveyProvider";
import { templateSurvey } from "../../config/template";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { db, parishCollectionRef } from "../../config/firebase";
import toast from "react-hot-toast";


const AddSurveyResult = () => {
    const {form, setForm:setFormData, setParishCode} = useContext(SurveyContext)
    const toastId = useRef<any>(null);
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate()
    const {code} = useParams()
    const pageRef = useRef(false)
    const handleChange = (e:any) => {
        let val:any = isNaN(e.target.value) || e.target.value===''? e.target.value : (Number(e.target.value));
        if(!isNaN(val) && e.target.type === 'number') {
            val = val < 1? 0 : val
        }
        setFormData((prev:any) => {
            return {
                ...prev,
                [e.target.name]: val
            }
        })
    }
    const handleCancel = () => {
        setFormData(templateSurvey)
        navigate('/')
    }
    const handleSave = async () => {
        setIsSaving(true)
        toastId.current = toast.loading('Saving...')
        try {
            const id = form?.parishCode || ''
            if(id !== '') {
                const updateParish = doc(db, "parish", id);
                await updateDoc(updateParish, form)
            } 
            else {
                await addDoc(parishCollectionRef, form)
            }
            
            toast.success('Successfully saved',{ id: toastId.current })
            navigate('/')
        } catch (error) {
            toast.error('Failed to save. Please try again.',{ id: toastId.current })
        }
        finally{
            setIsSaving(false)
        }
    }
    useEffect(() => {
        if(pageRef.current === false){
            if(code){
                setParishCode(code)
            }
            return ()=>{
                pageRef.current = true
            }
        }
    },[])
  return (
    <>
       <div className='mb-8'>
       <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Survey Results
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                     Parish
                    </label>
                    <input
                        onChange={handleChange}
                        value={form?.parishName}
                        name="parishName"
                        type="text"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                     Date
                    </label>
                    <input
                        onChange={handleChange}
                        value={form?.date}
                        name="date"
                        type="date"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                     Total Respondents
                    </label>
                    <input
                      value={form?.totalRespondents}
                      onChange={handleChange}
                      name="totalRespondents"
                      type="number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Respondents
                  </label>
                  <div className="md:flex ml-6">
                    {
                        form?.responseDents?.map((value:any, index:number) => {
                            return (
                            <div className="mb-4.5 mr-4" key={index}>
                                <label className="mb-2.5 text-black dark:text-white">
                                   {value?.name}
                                </label>
                                <input
                                    value={value?.value}
                                    onChange={(e) => {
                                        setFormData((prev:any) => {
                                            return {
                                                ...prev,
                                                responseDents: prev.responseDents.map((rp:any) => {
                                                    if(rp.name === value?.name) {
                                                        return {...rp, value: Number(e.target.value) || 0}
                                                    }
                                                    return rp;
                                                })
                                            }
                                        })
                                    }}
                                    type="number"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            )
                        })
                    }
                  </div>
                </div>

                <div className="mb-4.5">
                    {
                        form?.westoy?.map((value:any, index:number) => {
                            return <AddSurveyTable index={index} data={value} key={index} />
                        })
                    }
                    
                </div>
                <div className="flex flex-reverse">
                    <button disabled={isSaving} onClick={handleSave} type="button" className="2xsm:w-1/2 min-w-100 justify-center rounded bg-primary p-3 font-medium text-gray">
                    Save
                    </button>
                    <button onClick={handleCancel} className="2xsm:w-1/2 justify-center rounded bg-gray p-3 font-medium text-black text-center">
                    Cancel
                    </button>
                </div>
              </div>
            </form>
          </div>
        </div>                
        </div>
    </>
  );
};

export default AddSurveyResult;
