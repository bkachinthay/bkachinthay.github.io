/**
 *
 * Asynchronously loads the component for Ladders
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
