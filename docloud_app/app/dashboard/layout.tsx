import React, { ReactNode } from 'react';
import SideBar from '@/components/sideBar';
import '@/styles/styles.form.css';
import '@/styles/styles.layout.css';
import "@/styles/globals.css"
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    //Ana ekran : mainScreen
    <div className='mainScreen d-flex flex-column'>
      {/* Profil alanı */}
      <div className='left-end d-flex'>
        <p className='purple'>Sude Nur</p>
        <FontAwesomeIcon icon={faCircleUser} className='icons iconUser m-0 ms-3' />
      </div>
      {/* Profil alanı altında bulunan, içerisinde içeriğin ve Sidebar'ın bulunduğu alan */}
      <div className='subScreen bg-white d-flex'>
          <SideBar />
          {/* Sidebar dışında kalan alan */}
          <div className='mainPage d-flex justify-content-center align-items-center '>
               {/* İstenen içeriğin başlıkları ile bulunduğu alan */}
               <div className='container-cover'>
                  <div className='container'>{children}</div>
               </div>
          </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
