import React from 'react';

export default function Home() {
  return (
    <div  className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800'>About</h1>
      <p className='mb-4 text-slate-700'>
         JobCards is a simple app with authentication which allows users to sign up, sign in, and sign out. It provides access to protected routes only for authenticated users. The app is a simple tool that will help you to organize and keep track of your jobs. 
         You can add, edit, and delete jobs as needed. For each job you can add a title, details and the date will be added automatically. Also, you can add photos for each job separately which will help you to remember what neededs to be done. The jobs are stored on the server, so they will persist even if you close your browser. You can also mark jobs as completed. 
      </p>
      <p className='mb-4 text-slate-700'>
      The app is a work in progress, and I plan to add more features in the future. I hope you enjoy using the app!
      </p>
    </div>
  )
}
