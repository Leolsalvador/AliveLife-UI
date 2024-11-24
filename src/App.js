import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './components/UserContext';
import Login from './containers/Login';
import Home from './containers/Home';
import Docs from './containers/Docs';
import Analise from './containers/Analise';
import DocUp from './containers/DocUp';
import Diagnosis from './containers/Diagnosis';
import Patients from './containers/Patients';
import DocumentsPatients from './containers/DocsPatient';
import Users from './containers/Users';


export default function App() {
    return (
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute allowedRoles={['Paciente']}>
                <Home />
              </ProtectedRoute>
            }/>
            <Route path="/documents" element={
              <ProtectedRoute allowedRoles={['Paciente']}>
                <Docs />
              </ProtectedRoute>
            }/>
            <Route path="/analise" element={
              <ProtectedRoute allowedRoles={['Médico']}>
                <Analise/>
              </ProtectedRoute>
            }/>
            <Route path="/docup" element={
              <ProtectedRoute allowedRoles={['Médico']}>
                <DocUp/>
              </ProtectedRoute>
            }/>
            <Route path="/diagnosis" element={
              <ProtectedRoute allowedRoles={['Médico']}>
                <Diagnosis/>
              </ProtectedRoute>
            }/>
            <Route path="/patients" element={
              <ProtectedRoute allowedRoles={['Médico']}>
                <Patients/>
              </ProtectedRoute>
            }/>
            <Route path="/docs_patients" element={
              <ProtectedRoute allowedRoles={['Médico']}>
                <DocumentsPatients/>
              </ProtectedRoute>
            }/>
            <Route path="/users" element={
              <ProtectedRoute allowedRoles={['Atendente']}>
                <Users/>
              </ProtectedRoute>
            }/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    );
}