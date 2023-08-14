import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import routes from './routes';
import Results from './pages/Tables'
import { AuthProvider } from './context/AuthProvider';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
    <Toaster position='top-right' reverseOrder={false} containerClassName='overflow-auto'/>
      <AuthProvider>
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
      </AuthProvider>
    </>
  );
}

export default App;
