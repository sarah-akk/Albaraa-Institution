import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import Home from './layouts/Home';
import StudentList from './layouts/Students.tsx';
import Courses from './layouts/Courses.tsx';
import Settings from './layouts/Settings.tsx';
import Auth from './layouts/Auth.tsx';
import Classes from './layouts/Classes.tsx';
import Teachers from './layouts/Teachers.tsx';
import Attendance from './layouts/Attendance.tsx';
import Schedule from './layouts/Schedule.tsx';
import StudentsTests from './layouts/StudentsTests.tsx';
import Homeworks from './layouts/Homeworks.tsx';
import StudentsHomeWorks from './layouts/StudentsHomeworks.tsx';
import Outstanding from './layouts/Outstanding.tsx';
import Events from './layouts/Events.tsx';
import Adds from './layouts/Adds.tsx';
import Notifications from './layouts/Notifications.tsx';
import Installment from './layouts/Installment.tsx';
import GeneralInformation from './layouts/GeneralInformation .tsx';
import Contact from './layouts/Contact.tsx';
import Notes from './layouts/Notes.tsx';
import ComplaintsSuggestions from './layouts/Messages.tsx';
import Splash from './layouts/Splash.tsx';
import Employees from './layouts/Employee .tsx';
import SalaryManagement from './layouts/Salary.tsx';
import Sections from './layouts/Sections.tsx';
import TestComponent from './layouts/Test.tsx';
import Dashboard from './layouts/Dashboard/Dashboard.tsx';
import ChangePassword from './layouts/ChangePassword.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect } from 'react';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} >
            <Route
              path="dashboard"
              element={<Dashboard />}
            />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="students"
              element={<StudentList />}
            />
            <Route
              path="students/:id/tests"
              element={<TestComponent />}
            />
            <Route
              path="students/:id/attendance"
              element={<Attendance />}
            />
            <Route
              path="students/:id/schedule"
              element={<Schedule />}
            />
            <Route
              path="students/:id/notes"
              element={<Notes />}
            />
            <Route
              path="students/:id/notifications"
              element={<Notifications />}
            />
            <Route
              path="students/:id/homeworks"
              element={<Homeworks />}
            />
            <Route
              path="students/:id/changePassowrd"
              element={<ChangePassword />}
            />
            <Route
              path="students/:id/payments"
              element={<Installment />}
            />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="teachers/:id/tests"
              element={<TestComponent />}
            />
            <Route
              path="teachers"
              element={<Teachers />}
            />
            <Route
              path="teachers/:id/attendance"
              element={<Attendance />}
            />
            <Route
              path="teachers/:id/schedule"
              element={<Schedule />}
            />
            <Route
              path="teachers/:id/notes"
              element={<Notes />}
            />
            <Route
              path="teachers/:id/notifications"
              element={<Notifications />}
            />
            <Route
              path="teachers/:id/homeworks"
              element={<Homeworks />}
            />
            <Route
              path="teachers/:id/changePassowrd"
              element={<ChangePassword />}
            />
            <Route
              path="teachers/:id/payments"
              element={<Installment />}
            />
            <Route
              path="classes"
              element={<Classes />}
            />

            <Route
              path="classes/:id/sections"
              element={<Sections />}
            />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="courses"
              element={<Courses />}
            />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="attendance"
              element={<Attendance />}
            />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="schedule"
              element={<Schedule />}
            />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="tests"
              element={<TestComponent />} />

            <Route
              path="tests/:id/studentsTests"
              element={<StudentsTests />} />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="homeworks"
              element={<Homeworks />} />
            <Route
              path="homeworks/:homeworkId/studentsHomeworks"
              element={<StudentsHomeWorks />} />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="outstanding"
              element={<Outstanding />} />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="events"
              element={<Events />} />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="adds"
              element={<Adds />} />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="notifications"
              element={<Notifications />} />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="installment"
              element={<Installment />} />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="generalInformation"
              element={<GeneralInformation />} />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="contact"
              element={<Contact />} />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="notes"
              element={<Notes />} />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="messages"
              element={<ComplaintsSuggestions />} />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="employees"
              element={<Employees />} />
            <Route
              path="employees/:id/salary"
              element={<SalaryManagement />} />
            <Route
              path="salary"
              element={<SalaryManagement />} />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route
              path="settings"
              element={<Settings />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  );
}
export default App;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
