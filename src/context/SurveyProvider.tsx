import {
    createContext,
    FC,
    PropsWithChildren,
    useEffect,
    useRef,
    useState
  } from 'react';
import { templateSurvey } from '../config/template';
import { db, parishCollectionRef } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
  type TSurvey = {
    form?: any
    setForm?: any
    setParishCode?: any
  }
  const SurveyContext = createContext<TSurvey>({
  });
  const SurveyProvider: FC<PropsWithChildren> = ({ children }) => {
    const [form, setForm] = useState<any>(templateSurvey);
    const [code, setParishCode] = useState('')
    const fetchParishData = async ()=>{
        try {
            const docRef = doc(db, 'parish', code)
            const docSnapshot = await getDoc(docRef)
    
            if (docSnapshot.exists()) {
              const fetchedData = docSnapshot.data();
              setForm(fetchedData)
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    useEffect(() => {
        if(code && code !== '' && form?.parishCode === ''){
            fetchParishData()
        }
    },[code])
    return (
      <SurveyContext.Provider value={{ form, setForm, setParishCode }}>
        {children}
      </SurveyContext.Provider>
    );
  };
  
  export { SurveyContext, SurveyProvider };
  