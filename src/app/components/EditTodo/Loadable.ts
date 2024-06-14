/**
 *
 * Asynchronously loads the component for EditTodo
 *
 */

import { lazyLoad } from 'utils/loadable';

export const EditTodo = lazyLoad(
  () => import('./index'),
  module => module.EditTodo,
);
