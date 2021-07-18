import AdsApi, { IADSApiBootstrapData, IDocsEntity, SolrSort } from '@api';
import { NumFound, ResultList, SearchBar, Sort } from '@components';
import {
  ChevronRightIcon,
  DownloadIcon,
  GlobeAltIcon,
  MinusCircleIcon,
  PencilIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid';
import { useOnSearchSubmit } from '@hooks/useOnSearchSubmit';
import { rootInitialContext } from '@machines';
import { NectarPage } from '@types';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { normalizeURLParams } from '../../utils';

interface ISearchPageProps extends NectarPage {
  error?: string;
  userData: IADSApiBootstrapData;
  params: {
    q: string;
    fl?: string[];
    sort?: SolrSort[];
  };
  docs: IDocsEntity[];
  meta: {
    numFound: number;
  };
}

const SearchPage: NextPage<ISearchPageProps> = (props) => {
  const {
    params: { q: query, sort },
    docs = [],
    meta: { numFound = 0 },
  } = props;

  const form = React.useRef<HTMLFormElement>(null);

  /**
   * On sort change, submit the form
   */
  const handleSortChange = (updatedSort: SolrSort[]) => {
    // if (sort && sort[0] !== updatedSort[0]) {
    //   form.current.submit();
    // }
  };

  const Router = useRouter();
  const handleOnSubmit = useOnSearchSubmit(Router);

  return (
    <section aria-labelledby="form-title">
      <form
        method="get"
        action="/search"
        ref={form}
        onSubmit={handleOnSubmit}
        className="grid grid-cols-6 gap-2 px-4 py-8 mx-auto my-8 bg-white shadow sm:rounded-lg lg:max-w-7xl"
      >
        <h2 className="sr-only">Search Results</h2>
        <div className="col-span-6">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <SearchBar initialQuery={query} />
            </div>
            <Sort sort={sort} onChange={handleSortChange} />
          </div>
          <NumFound count={numFound} />
          {/* <Filters /> */}
        </div>
        <div className="col-span-6">
          <ResultList docs={docs} />
        </div>
        <div className="col-span-6"></div>
      </form>
    </section>
  );
};

const Filters = () => (
  <div className="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-1 sm:space-x-6">
    <div className="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded">
      <PlusCircleIcon className="mr-1.5 w-5 h-5 text-indigo-400" aria-hidden="true" />
      Collection: Astronomy
    </div>
    <div className="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded">
      <PlusCircleIcon className="mr-1.5 w-5 h-5 text-indigo-400" aria-hidden="true" />
      Collection: Physics
    </div>
    <div className="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded">
      <MinusCircleIcon className="mr-1.5 w-5 h-5 text-indigo-400" aria-hidden="true" />
      Author: Smith, S
    </div>
  </div>
);

const BreadCrumbs = () => (
  <nav className="flex" aria-label="Breadcrumb">
    <ol className="flex items-center space-x-4" role="list">
      <li>
        <div>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-300">
            Classic Search
          </a>
        </div>
      </li>
      <li>
        <div className="flex items-center">
          <ChevronRightIcon className="flex-shrink-0 w-5 h-5 text-gray-500" aria-hidden="true" />
          <a href="#" className="ml-4 text-sm font-medium text-gray-600 hover:text-gray-300">
            Results
          </a>
        </div>
      </li>
    </ol>
  </nav>
);

const MenuButtons = () => (
  <div className="flex">
    <span className="hidden sm:block">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-gray-800 focus:ring-offset-2 focus:ring-2"
      >
        <PencilIcon className="w-5 h-5 mr-2 -ml-1 text-gray-300" aria-hidden="true" />
        Sort
      </button>
    </span>
    <span className="hidden ml-3 sm:block">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-gray-800 focus:ring-offset-2 focus:ring-2"
      >
        <DownloadIcon className="w-5 h-5 mr-2 -ml-1 text-gray-300" aria-hidden="true" />
        Export
      </button>
    </span>
    <span className="sm:ml-3">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-indigo-500 focus:ring-offset-gray-800 focus:ring-offset-2 focus:ring-2"
      >
        <GlobeAltIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
        Explore
      </button>
    </span>
  </div>
);

export const getServerSideProps: GetServerSideProps<Omit<ISearchPageProps, 'service'>> = async (ctx) => {
  const query = normalizeURLParams(ctx.query);

  const request = ctx.req as typeof ctx.req & {
    session: { userData: IADSApiBootstrapData };
  };
  const userData = request.session.userData;
  const params = {
    q: query.q,
    fl: ['bibcode', 'title', 'author', '[fields author=3]', 'author_count', 'pubdate'],
    sort: query.sort ? (query.sort.split(',') as SolrSort[]) : [],
  };
  const adsapi = new AdsApi({ token: userData.access_token });
  const result = await adsapi.search.query(params);
  if (result.isErr()) {
    return {
      props: {
        error: result.error.message,
        userData: rootInitialContext.user,
        params: {
          q: '',
          fl: [],
          sort: [],
        },
        docs: [],
        meta: { numFound: 0 },
      },
    };
  }

  const { docs, numFound } = result.value;

  return {
    props: {
      userData,
      params,
      docs,
      meta: { numFound: numFound },
    },
  };
};

export default SearchPage;
