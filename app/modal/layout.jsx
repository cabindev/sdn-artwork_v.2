// modal/layout.tsx
import React, { Suspense } from 'react';
import Loading from './loading';
var Layout = function (_a) {
    var children = _a.children;
    return (<Suspense fallback={<Loading />}>
      {children}
    </Suspense>);
};
export default Layout;
