/* Method-3: truncate current page url only */

import { HomeIcon } from '@/icons';
import { Link, Params, useMatches } from 'react-router-dom';
import { Fragment } from 'react';

type Handle = {
  breadcrumb?: string | ((params: Params<string>) => string);
};

const Breadcrumbs = () => {
  const matches = useMatches();
  
  const crumbs = matches
    .filter(match => {
      const handle = match.handle as Handle | undefined;
      return handle?.breadcrumb !== undefined;
    })
    .map((match) => {
      const handle = match.handle as Handle;
      const params = match.params;
      
      // Handle both string and function breadcrumbs
      const label = typeof handle.breadcrumb === 'function' 
        ? handle.breadcrumb(params) 
        : handle.breadcrumb;
      
      return {
        label,
        path: match.pathname,
      };
    });

  return (
    <div className="py-8 flex items-center gap-2 text-sm font-medium text-slate-500 overflow-hidden">
      <Link to="/dashboard" className="flex-shrink-0 flex items-center gap-1 hover:text-orange-600">
        <HomeIcon className="flex-shrink-0" />
        <span className="whitespace-nowrap">Dashboard</span>
      </Link>

      {crumbs.slice(1).map(({ path, label }, index) => {
        const isLast = index === crumbs.length - 2;
        
        return (
          <Fragment key={path}>
            <span className="flex-shrink-0">/</span>
            {isLast ? (
              <span 
                className="text-slate-700 font-bold truncate max-w-[180px] md:max-w-lg"
                title={label}
              >
                {label}
              </span>
            ) : (
              <Link 
                to={path}
                className="hover:text-orange-600 whitespace-nowrap flex-shrink-0"
              >
                {label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;




// /* Method-3: truncate current page url only */

// import { HomeIcon } from '@/icons';
// import { Link, useMatches } from 'react-router-dom';
// import { Fragment } from 'react';

// type Handle = {
//   breadcrumb?: string
// }

// const Breadcrumbs = () => {
//   const matches = useMatches();
//   const crumbs = matches
//     .filter(match => Boolean((match.handle as Handle)?.breadcrumb))
//     .map((match) => ({
//       label: (match.handle as Handle).breadcrumb!,
//       path: match.pathname,
//     }))

//   return (
//     <div className="py-8 flex items-center gap-2 text-sm font-medium text-slate-500 overflow-hidden">
//       <Link to="/dashboard" className="flex-shrink-0 flex items-center gap-1 hover:text-orange-600">
//         <HomeIcon className="flex-shrink-0" />
//         <span className="whitespace-nowrap">Dashboard</span>
//       </Link>

//       {crumbs.slice(1).map(({ path, label }, index) => {
//         const isLast = index === crumbs.length - 2;
        
//         return (
//           <Fragment key={path}>
//             <span className="flex-shrink-0">/</span>
//             {isLast ? (
//               <span 
//                 className="text-slate-700 font-bold truncate max-w-[180px] md:max-w-lg"
//                 title={label}
//               >
//                 {label}
//               </span>
//             ) : (
//               <Link 
//                 to={path}
//                 className="hover:text-orange-600 whitespace-nowrap flex-shrink-0"
//               >
//                 {label}
//               </Link>
//             )}
//           </Fragment>
//         );
//       })}
//     </div>
//   )
// }
// export default Breadcrumbs















// import { Link, useLocation } from 'react-router-dom'
// import { HomeIcon } from '@/icons';
// import { Fragment } from 'react';

// const Breadcrumbs = () => {
//   const { pathname } = useLocation();
//   const segments = pathname.split('/').filter(Boolean);

//   const formatSegment = (segment: string) => 
//     segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

//   return (
//     <div className="py-8 flex items-center gap-2 text-sm font-medium text-slate-500 overflow-hidden">
//       <Link to="/" className="flex-shrink-0 flex items-center gap-1 hover:text-red-600">
//         <HomeIcon className="flex-shrink-0" />
//         <span className="whitespace-nowrap">Home</span>
//       </Link>

//       {segments.map((segment, index) => {
//         const href = `/${segments.slice(0, index + 1).join('/')}`
//         const isLast = index === segments.length - 1
//         const formatted = formatSegment(segment)
        
//         return (
//           <Fragment key={href}>
//             <span className="flex-shrink-0">/</span>
//             {isLast ? (
//               <span 
//                 className="text-slate-700 font-bold truncate max-w-[180px] md:max-w-lg"
//                 title={formatted}
//               >
//                 {formatted}
//               </span>
//             ) : (
//               <Link 
//                 to={href}
//                 className="hover:text-red-600 whitespace-nowrap flex-shrink-0"
//               >
//                 {formatted}
//               </Link>
//             )}
//           </Fragment>
//         );
//       })}
//     </div>
//   )
// }

// export default Breadcrumbs