import React, { useContext } from 'react';
import { mount } from 'enzyme';
import { ErrorPage, AppContext } from '@edx/frontend-platform/react';

import EnterprisePage from './EnterprisePage';
import { LoadingSpinner } from '../loading-spinner';
import NotFoundPage from '../NotFoundPage';
import * as hooks from './data/hooks';

const mockUser = {
  profileImage: 'http://fake.image',
};
jest.mock('@edx/frontend-platform/auth');
jest.mock('@edx/frontend-platform/react', () => ({
  esModule: true,
  ...jest.requireActual('@edx/frontend-platform/react'),
  ErrorPage: () => <div data-testid="error-page" />,
}));
jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ enterpriseSlug: 'test-enterprise-slug' }),
}));

describe('<EnterprisePage />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('renders loading state', () => {
    it('while fetching enterprise config', () => {
      // mock hook as if async call to fetch enterprise config is still resolving
      jest.spyOn(hooks, 'useEnterpriseCustomerConfig').mockImplementation(() => [undefined, undefined]);
      const wrapper = mount(<AppContext.Provider value={{ authenticatedUser: { ...mockUser } }}><EnterprisePage><div className="did-i-render" /></EnterprisePage></AppContext.Provider>);
      expect(wrapper.find(LoadingSpinner)).toBeTruthy();
    });
    it('while hydrating user metadata', () => {
      // mock hook as if async call to fetch enterprise config is fully resolved
      jest.spyOn(hooks, 'useEnterpriseCustomerConfig').mockImplementation(() => [{}, undefined]);
      const wrapper = mount(<AppContext.Provider value={{ authenticatedUser: {} }}><EnterprisePage><div className="did-i-render" /></EnterprisePage></AppContext.Provider>);
      expect(wrapper.find(LoadingSpinner)).toBeTruthy();
    });
  });
  it('renders error state when unable to fetch enterprise config', () => {
    // mock hook as if async call to fetch enterprise config is fully resolved
    jest.spyOn(hooks, 'useEnterpriseCustomerConfig').mockImplementation(() => [null, new Error('test error')]);
    const wrapper = mount(<AppContext.Provider value={{ authenticatedUser: { ...mockUser } }}><EnterprisePage><div className="did-i-render" /></EnterprisePage></AppContext.Provider>);
    expect(wrapper.find(ErrorPage)).toBeTruthy();
  });
  it('renders not found page when no enterprise config is found', () => {
    // mock hook as if async call to fetch enterprise config is fully resolved
    jest.spyOn(hooks, 'useEnterpriseCustomerConfig').mockImplementation(() => [null, undefined]);
    const wrapper = mount(<AppContext.Provider value={{ authenticatedUser: { ...mockUser } }}><EnterprisePage><div className="did-i-render" /></EnterprisePage></AppContext.Provider>);
    expect(wrapper.find(NotFoundPage)).toBeTruthy();
  });
  it('populates AppContext with expected values', () => {
    const mockEnterpriseConfig = {
      slug: 'test-slug',
    };
    jest.spyOn(hooks, 'useEnterpriseCustomerConfig').mockImplementation(() => [mockEnterpriseConfig, undefined]);
    const ChildComponent = () => {
      const contextValue = useContext(AppContext);
      return <div className="did-i-render" data-contextvalue={contextValue} />;
    };
    const wrapper = mount(
      <AppContext.Provider value={{ authenticatedUser: { ...mockUser } }}>
        <EnterprisePage>
          <ChildComponent />
        </EnterprisePage>
      </AppContext.Provider>,
    );
    const actualContextValue = wrapper.find('.did-i-render').prop('data-contextvalue');
    expect(actualContextValue).toEqual(
      expect.objectContaining({
        authenticatedUser: mockUser,
        config: expect.any(Object),
        enterpriseConfig: mockEnterpriseConfig,
        courseCards: {
          'in-progress': {
            settingsMenu: {
              hasMarkComplete: true,
            },
          },
        },
        algolia: {
          client: expect.any(Object),
          index: expect.any(Object),
        },
      }),
    );
  });
});
