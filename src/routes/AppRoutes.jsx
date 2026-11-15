import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import PublicLayout from '../components/layout/PublicLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Public pages
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/public/LoginPage';

// Student / Repository pages
import StudentDashboard from '../pages/student/StudentDashboard';
import ProjectRepository from '../pages/student/ProjectRepository';
import ProjectDetails from '../pages/student/ProjectDetails';
import NewIdeaAnalysis from '../pages/student/NewIdeaAnalysis';
import AnalysisResult from '../pages/student/AnalysisResult';
import MyAnalyses from '../pages/student/MyAnalyses';
import SavedProjects from '../pages/student/SavedProjects';
import StudentSettings from '../pages/student/StudentSettings';

// Faculty pages
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import ManageProjects from '../pages/faculty/ManageProjects';
import AddEditProject from '../pages/faculty/AddEditProject';
import AnalysisReviews from '../pages/faculty/AnalysisReviews';
import FacultyAnalytics from '../pages/faculty/FacultyAnalytics';
import FacultySettings from '../pages/faculty/FacultySettings';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public landing & authentication routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Publicly accessible Project Repository (unauthenticated visitors can explore) */}
      <Route element={<PublicLayout />}>
        <Route path="/projects" element={<ProjectRepository basePath="/projects" />} />
        <Route path="/projects/:id" element={<ProjectDetails basePath="/projects" />} />
      </Route>

      {/* Student workspace routes (Protected - Requires Student Authentication) */}
      <Route
        path="/student"
        element={
          <ProtectedRoute requiredRole="student">
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="projects" element={<ProjectRepository basePath="/student/projects" />} />
        <Route path="projects/:id" element={<ProjectDetails basePath="/student/projects" />} />
        <Route path="analyse" element={<NewIdeaAnalysis />} />
        <Route path="analysis/:id" element={<AnalysisResult />} />
        <Route path="analyses" element={<MyAnalyses />} />
        <Route path="saved" element={<SavedProjects />} />
        <Route path="settings" element={<StudentSettings />} />
      </Route>

      {/* Faculty oversight routes (Protected - Requires Faculty Authentication) */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute requiredRole="faculty">
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/faculty/dashboard" replace />} />
        <Route path="dashboard" element={<FacultyDashboard />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="projects/new" element={<AddEditProject />} />
        <Route path="projects/edit/:id" element={<AddEditProject />} />
        <Route path="reviews" element={<AnalysisReviews />} />
        <Route path="analytics" element={<FacultyAnalytics />} />
        <Route path="settings" element={<FacultySettings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
