import {
    createContext,
    FC,
    PropsWithChildren,
    useState
  } from 'react';
import { templateSurvey } from '../config/template';
  type TSurvey = {
    form?: any
    setForm?: any
  }
  const SurveyContext = createContext<TSurvey>({
  });
  const SurveyProvider: FC<PropsWithChildren> = ({ children }) => {
    const [form, setForm] = useState(templateSurvey);
    return (
      <SurveyContext.Provider value={{ form, setForm }}>
        {children}
      </SurveyContext.Provider>
    );
  };
  
  export { SurveyContext, SurveyProvider };
  