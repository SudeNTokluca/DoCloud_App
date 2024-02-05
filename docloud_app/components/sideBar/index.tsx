"use client"
import React from 'react';
import '@/styles/styles.form.css';
import '@/styles/styles.layout.css';
import { useSelectedLayoutSegment } from 'next/navigation';
import StorageBar from '@/components/storageBar';
import Link from 'next/link';
import { faDatabase, faFolderOpen, faHouse, faPlus, faRightFromBracket, faStar, faTrash, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface SidebarOption {
  name: string;
  href: string;
  current: boolean;
  icon: any;
}

const SideBar: React.FC = () => {
  const segment = useSelectedLayoutSegment();

  const sidebarOptions: SidebarOption[] = [
    { name: "Add New File", href: "/dashboard/add_file", current: `/${segment}` === "/add_file" ? true : false, icon: faPlus },
    { name: "Home", href: "/dashboard/home", current: `/${segment}` === "/home" ? true : false, icon: faHouse },
    { name: "Folders and Files", href: "/dashboard/folders", current: `/${segment}` === "/folders" ? true : false, icon: faFolderOpen },
    { name: "Bin", href: "/dashboard/bin", current: `/${segment}` === "/bin" ? true : false, icon: faTrash },
    { name: "Starred", href: "/dashboard/starred", current: `/${segment}` === "/starred" ? true : false, icon: faStar },
    { name: "Storage", href: "/dashboard/storage", current: `/${segment}` === "/storage" ? true : false, icon: faDatabase },
    { name: "Settings", href: "/dashboard/settings", current: `/${segment}` === "/settings" ? true : false, icon: faUserGear },
    { name: "Log Out", href: "/", current: false, icon: faRightFromBracket },
  ];

  return (
    <div className='left-sidebar p-0'>
        {/*Sidebar header listesi */}
        <ul role='list' className='p-0 m-0'>
          <li>
            <ul role='list' className='p-0 '>
              <div className='page-refer'></div>
              {sidebarOptions.map((option) => (
                <li key={option.name} /*style={option.name === "Log Out" ? {} : {}}*/>
                  <Link href={option.href} className={classNames(option.current ? "text-white" : "purple")}>
                    <div
                      className={classNames(option.current ? "current" : "not-current ", ' page-refer d-flex p-3 ', '')}
                      style={option.name === "Storage" ? { height: '100px', flexWrap: 'wrap' } : (option.name === "Log Out" ? { /*borderRadius: '0 0 0 50px',*/  } : {})}>
                      <FontAwesomeIcon icon={option.icon} className={classNames(option.current ? "text-white" : "purple", ' icons m-2')} />
                      {option.name}
                      {option.name === "Storage" && <StorageBar />}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>

    </div>
  );
}

export default SideBar;
