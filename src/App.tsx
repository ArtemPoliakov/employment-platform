import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import globalContainerStyles from "./global_styles/global_container.module.css";
import "./global_styles/normalize.module.css";
import "./global_styles/global_variables.module.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";
import AuthPage from "./Pages/AuthPage/components/AuthPage";
import HomePage from "./Pages/HomePage/components/HomePage";
import VacancyPage from "./Pages/VacancyPage/VacancyPage";
import ApplicationsPage from "./Pages/ApplicationsPage/ApplicationsPage";
import OffersPage from "./Pages/OffersPage/OffersPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route
          path="profile/:profileRole/:viewMode/:userName"
          element={<ProfilePage />}
        />
        <Route path="auth" element={<AuthPage />} />
        <Route path="vacancy/:vacancyId/:viewMode" element={<VacancyPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

const Root = () => {
  return (
    <>
      <UserProvider>
        <div className={globalContainerStyles.globalPageFlexContainer}>
          <Outlet />
          <ToastContainer />
        </div>
      </UserProvider>
    </>
  );
};

export default App;
