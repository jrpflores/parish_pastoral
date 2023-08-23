import { useContext } from "react"
import { SurveyContext } from "../../context/SurveyProvider"
import { produce } from "immer"

const AddSurveyQuestionAnswer = ({data, wType, wTypeIndex, westoy, questionIndex}:any) => {
    const { form, setForm} = useContext(SurveyContext)
    const handleChangeAnswer = (val:any, ai:number) => {
       setForm((prev:any) => 
            produce(prev, (drafData:any) => {
                if(wType === "subcommittee"){
                    const westoyIndex = drafData.westoy.findIndex( (x:any) => x.type === westoy)
                    drafData.westoy[westoyIndex].details.subcomittee[wTypeIndex].questions[questionIndex].answers[ai].value = Number(val)||0
                }
                else {
                    const westoyIndex = drafData.westoy.findIndex( (x:any) => x.type === westoy)
                    drafData.westoy[westoyIndex].details.others[wTypeIndex].questions[questionIndex].answers[ai].value = Number(val)||0
                }
            })
       )
    }
    return (
        data?.answers?.map((q:any,qi:number) => {
            return (
                <td key={qi} className="h-10 border border-slate-600">
                     <input
                        value={q?.value}
                        onChange={(e) => {
                            handleChangeAnswer(e.target.value, qi)
                        }}
                        type="number"
                        className="pl-5 w-full h-full border-stroke bg-transparent  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                </td>
            )
        })
    )
}
export default AddSurveyQuestionAnswer