// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';

// interface BreadcrumbItem {
//     path: string;
//     label: string;
// }

// const Breadcrumbs: React.FC = () => {
//     const location = useLocation();
//     const pathnames = location.pathname.split('/').filter((x) => x); // Убираем пустые элементы

//     const pathMapping: Record<string, string> = {
//         '': 'Главная',
//         'works': 'Реконструкционные работы',
//         'work': 'Подробнее',
//       };  

//     const breadcrumbItems: BreadcrumbItem[] = pathnames.map((pathname, index) => {
//         const path = `/${pathnames.slice(0, index + 1).join('/')}`;
//         const label = pathMapping[pathname] || pathname;
//         return { path, label };
//     });
  
//     return (
//         <div className="breadcrumbs-container">
//           <nav className="breadcrumbs">
//             {breadcrumbItems.map(({ path, label }, index) => (
//               <span key={path}>
//                 <Link to={path}>{label}</Link>
//                 {index < breadcrumbItems.length - 1 && ' / '}
//               </span>
//             ))}
//           </nav>
//         </div>
//     );
// };
  
//   export default Breadcrumbs;

import "./BreadCrumbs.css";
import React from "react";
import { Link } from "react-router-dom";
import { FC } from "react";
import { ROUTES } from "../Routes";

interface ICrumb {
  label: string;
  path?: string;
}

interface BreadCrumbsProps {
  crumbs: ICrumb[];
}

export const BreadCrumbs: FC<BreadCrumbsProps> = (props) => {
  const { crumbs } = props;

  return (
    <ul className="breadcrumbs">
      <li>
        <Link to={ROUTES.HOME}>Главная</Link>
      </li>
      {!!crumbs.length &&
        crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <li className="slash">/</li>
            {index === crumbs.length - 1 ? (
              <li>{crumb.label}</li>
            ) : (
              <li>
                <Link to={crumb.path || ""}>{crumb.label}</Link>
              </li>
            )}
          </React.Fragment>
        ))}
    </ul>
  );
};