
const AddSurveyQuestionTd = ({data}:any) => {
    return (
        data?.map((val:string, i:number) => {
            return (
                <th key={i} className="uppercase px-5 border border-slate-600">{val}</th>
            )
        })
    )
}
export default AddSurveyQuestionTd