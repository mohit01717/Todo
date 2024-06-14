/**
 *
 * Asynchronously loads the component for AddTodo
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AddTodo = lazyLoad(
  () => import('./index'),
  module => module.AddTodo,
);
