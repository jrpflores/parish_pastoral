import { useContext } from "react";
import AddSurveyQuestionAnswer from "./AddSurveyQuestionAnswer";
import AddSurveyQuestionTd from "./AddSurveyQuestionTd";
import { SurveyContext } from "../../context/SurveyProvider";
import { produce } from "immer";

const AddSurveyTable = ({data, index}:any) => {
    const {setForm} = useContext(SurveyContext)
    const scQuestions = data?.details?.subcomittee[0]?.questions?.map((e:any) => e.title)
    const scFactors = data?.details?.subcomittee[0]?.factors.map((e:any) => e.name)
    const scAnswers = data?.details?.subcomittee[0]?.questions[0]?.answers.map((e:any) => e.name)
    const othersTitle = data?.details?.others[0]?.title
    const sc = data?.details?.subcomittee?.map((e:any) => e)
    const othersQuestions = data?.details?.others[0]?.questions || []

    const handleFactors = (val:any, sci:number, ai:number) => {
        setForm((prev:any) => 
             produce(prev, (drafData:any) => {
                 const westoyIndex = drafData.westoy.findIndex( (x:any) => x.type === data?.type)
                 drafData.westoy[westoyIndex].details.subcomittee[sci].factors[ai].value = Number(val)||0
             })
        )
     }
  return (
    <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
        <span className='uppercase'>{index+1}. {`(${data?.type})`}</span> {data?.title ? data.title : `Aduna ba'y sub-committees ang inyong PAROKYA?`}
        </h4>
      </div>
      <div className="py-6 px-4 md:px-6 overflow-x-auto">
        <table className="text-xs table-auto border-collapse border border-slate-500">
            <thead>
                <tr>
                    <th className="px-5 border border-slate-600">SubComittee</th>
                    {
                        scQuestions.map((val:string, i:number) => {
                            return (
                                <th colSpan={3} key={i} className="px-5 border border-slate-600">{val}</th>
                            )
                        })
                    }
                    <th className="px-5 border border-slate-600" colSpan={3}>Mga (factors) hinungdan, kapasikaran o kakulangan</th>
                </tr>
                <tr>
                    <th></th>
                    {
                        scQuestions.map((val:string, i:number) => {
                            return (
                            <AddSurveyQuestionTd key={i} data={scAnswers} />
                            )
                        })
                    }
                    {
                        scFactors.map((val:string, i:number) => {
                            return (
                                <th  key={i}className="uppercase px-5 border border-slate-600">{val}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    sc?.map((val:any, i:number) => {
                    return (
                        <tr key={i}>
                            <td className="px-5 border border-slate-600">{val?.name}</td>
                            {
                                val?.questions?.map((q:any,qi:number) => {
                                    return (
                                    <AddSurveyQuestionAnswer westoy={data?.type} wType="subcommittee" wTypeIndex={i} questionIndex={qi} key={qi} data={q} />
                                    )
                                })
                            }
                            {
                                val?.factors?.map((q:any,qi:number) => {
                                    return (
                                        <td key={qi} className="border border-slate-600">
                                            <input
                                                value={q?.value}
                                                onChange={(e) => {
                                                    handleFactors(e.target.value, i, qi)
                                                }}
                                                type="number"
                                                className="pl-5  w-full h-full border-stroke bg-transparent  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                />
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                    })
                }
            </tbody>
            </table>
      </div>
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h6 className="text-lg font-semibold text-black dark:text-white">{othersTitle}</h6>
      </div>
      <div className="py-6 px-4 md:px-6 overflow-x-auto">
      <table className="text-xs table-auto border-collapse border border-slate-500">
            <thead>
                <tr>
                    <th className="px-5 border border-slate-600">Activity</th>
                    {
                        scAnswers.map((val:string, i:number) => {
                            return (
                                <th key={i} className="capitalize px-5 border border-slate-600">{val}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
            {
                    othersQuestions?.map((val:any, i:number) => {
                    return (
                        <tr key={i}>
                            <td className="px-5 border border-slate-600">{val?.title}</td>
                            <AddSurveyQuestionAnswer westoy={data?.type} wType="others" wTypeIndex={0} questionIndex={i} key={i} data={val} />
                        </tr>
                    )
                    })
                }
            </tbody>
            </table>
      </div>
    </div>
  );
};

export default AddSurveyTable;
