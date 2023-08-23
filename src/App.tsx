import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import routes from './routes';
import Results from './pages/Tables'
import { AuthProvider } from './context/AuthProvider';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { SurveyProvider } from './context/SurveyProvider';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate()
  onAuthStateChanged(auth, user => {
    if(!user) {
      navigate('/auth/signin')
    }
  })
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
    <Toaster position='top-center' reverseOrder={false} containerClassName='overflow-auto'/>
      <AuthProvider>
      <SurveyProvider>
        <Routes>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route element={<DefaultLayout />}>
            <Route index element={<Results />} />
            {routes.map(({ path, component: Component }, index: number) => (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            ))}
          </Route>
        </Routes>
      </SurveyProvider>
      </AuthProvider>
    </>
  );
}

export default App;
