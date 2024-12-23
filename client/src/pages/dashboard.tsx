import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="p-32 flex flex-col gap-4">
      <Link to="/" className="hover:underline hover:text-primary">Back to home</Link>
      <h1 className="dark:text-slate-50 text-3xl">Dashboard</h1>
    </div>
  );
}

export default Dashboard
