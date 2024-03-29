import { loader as loaderDefaultOptions } from '@/config';
import Loading from '@/display/components/Loading';

import asyncComponentLoader from './loader';
import type { AnyProps, LoadComponent, LoaderDefaultOptions } from './types';

const configuredAsyncComponentLoader = (
  loadComponent: LoadComponent,
  additionalProps: AnyProps = {},
  loaderOptions: LoaderDefaultOptions = loaderDefaultOptions,
  FallbackWaiting = Loading,
) => asyncComponentLoader(loadComponent, additionalProps, loaderOptions, FallbackWaiting);

export { loaderDefaultOptions };
export default configuredAsyncComponentLoader;
