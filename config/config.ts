// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV,API_URL } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || '',
   // API_URL: API_URL ||'https://api.kaonengli.com' ,
    API_URL: API_URL ||'https://api-tc.glendot.com' ,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/others',
          component: '../layouts/BlankLayout',
         
          routes: [
            {
              path: '/others',
              redirect: '/others/termsOfUse',
            },
            {
              path: '/others/termsOfUse',
              name: 'termsOfUse',
              routes: [
                {
                  path: '/others/termsOfUse',
                  component: './others/termsOfUse',
                },
              ],
            },
            {
              path: '/others/privacyPolicy',
              name: 'privacyPolicy',
              routes: [
                {
                  path: '/others/privacyPolicy',
                  component: './others/privacyPolicy',
                },
              ],
            },
             {
              path: '/others/risk',
              name: 'risk',
              routes: [
                {
                  path: '/others/risk',
                  component: './others/risk',
                },
              ],
            },
          ],
       },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard/analysis',
            },
            {
              path: '/dashboard/analysis',
              icon: 'dashboard',
              name: 'dashboard',
              routes: [
                {
                  path: '/dashboard/analysis',
                  component: './dashboard/analysis',
                },
              ],
            },
           
            {
              path: '/student',
              icon: 'user',
              name: 'students',
              routes: [
                {
                  path: '/student',
                  component: './student',
                },
              ],
            },
            {
              path: '/studentDetail',
              routes: [
                {
                  path: '/studentDetail/tab',
                  component: './studentDetail/tab',
                  routes: [
                    {
                      path: '/studentDetail/tab',
                      redirect: '/studentDetail/tab/profile',
                    },
                    {
                      path: '/studentDetail/tab/profile',
                      component: './studentDetail/tab/profile',
                    },
                    {
                      path: '/studentDetail/tab/examhistory',
                      component: './studentDetail/tab/examhistory',
                    },
                    {
                      path: '/studentDetail/tab/permission',
                      component: './studentDetail/tab/permission',
                    },
                  ],
                },
                {
                  path: '/',
                  redirect: '/list/table-list',
                },
                {
                  name: 'table-list',
                  icon: 'smile',
                  path: '/list/table-list',
                  component: './list/table-list',
                },
                {
                  name: 'basic-list',
                  icon: 'smile',
                  path: '/list/basic-list',
                  component: './list/basic-list',
                },
                {
                  name: 'card-list',
                  icon: 'smile',
                  path: '/list/card-list',
                  component: './list/card-list',
                },
              ],
            },

            {
              path: '/examiners',
              icon: 'user',
              name: 'examiners',
              routes: [
                {
                  path: '/examiners',
                  component: './examiners',
                }
              ],
            },
            {
              path: '/examinerDetail',
              //name: 'Examiners Detail',
              routes: [
                {
                  path: '/examinerDetail/tab',
                  component: './examinerDetail/tab',
                  routes: [
                    {
                      path: '/examinerDetail/tab',
                      redirect: '/examinerDetail/tab/profile',
                    },
                    {
                      path: '/examinerDetail/tab/profile',
                      component: './examinerDetail/tab/profile',
                    },
                   /* {
                      path: '/examinerDetail/tab/examhistory',
                      component: './examinerDetail/tab/examhistory',
                    },
                    {
                      path: '/examinerDetail/tab/authorization',
                      component: './examinerDetail/tab/authorization',
                    },*/
                  ],
                },
              ],
            },
            /*{
              path: '/examinerdetailData',
             // icon: 'table',
             // name: 'Detail',
              routes: [
                {
                  path: '/examinerdetailData',
                  component: './examinerdetailData',
                }
              ],
            },*/

             {
              path: '/testcenter',
              icon: 'profile',
              name: 'testcenter',
              routes: [
                {
                  path: '/testcenter',
                  component: './testcenter',
                }
              ],
            },

            {
              path: '/testCenterDetail',
              routes: [
                {
                  path: '/testCenterDetail/tab',
                  component: './testCenterDetail/tab',
                  routes: [
                    {
                      path: '/testCenterDetail/tab',
                      redirect: '/testCenterDetail/tab/profile',
                    },
                    {
                      path: '/testCenterDetail/tab/profile',
                      component: './testCenterDetail/tab/profile',
                    },
                    /*{
                      path: '/testCenterDetail/tab/authorization',
                      component: './testCenterDetail/tab/authorization',
                    },*/
                  ],
                },
              ],
            },

            /*{
              path: '/exams',
              icon: 'form',
              name: 'exams',
              routes: [
                {
                  path: '/exams',
                  component: './tests',
                }
              ],
            },*/
            {
              name: 'exams',
              icon: 'form',
              path: '/exam-tab/center',
              routes: [
                {
                  path: '/exam-tab/center',
                  component: './exam-tab/center',
                },
                
                /*{
                  name: 'center',
                  icon: 'smile',
                  path: '/exam-tab/center',
                  component: './exam-tab/center',
                },*/
               
              ],
            },
             
            {
            path: '/testsDetail/tab',
           // icon: 'table',
           // name: 'Tests Detail',
            routes: [
              {
                path: '/testsDetail/tab',
                component: './testsDetail/tab',
                  routes: [
                    {
                      path: '/testsDetail/tab',
                      redirect: '/testsDetail/tab/dashboard',
                    },
                    {
                      path: '/testsDetail/tab/dashboard',
                      component: './testsDetail/tab/dashboard',
                    },
                    {
                      path: '/testsDetail/tab/students',
                      component: './testsDetail/tab/students',
                    },
                    {
                      path: '/testsDetail/tab/examiners',
                      component: './testsDetail/tab/examiners',
                    },
                  ],
                },
              ],
            },

            {
              path: '/settingstests/step-form',
              component: './settingstests/step-form',
            },
            {
              path: '/settingstests/step-form-edit',
              component: './settingstests/step-form-edit',
            },
           
            {
              path: '/settingstests/test-step-form',
              component: './settingstests/test-step-form',
            },
            {
              path: '/settingstests/test-step-form-edit',
              component: './settingstests/test-step-form-edit',
            },
            {
              path: '/settingstests/testView',
              component: './settingstests/testView',
            },
            {
              path: '/settingstests/questionView',
              component: './settingstests/questionView',
            },


            {
            path: '/settingstests/tab',
            icon: 'setting',
            name: 'settings',
            routes: [
              {
                path: '/settingstests/tab',
                component: './settingstests/tab',
                  routes: [
                    {
                      path: '/settingstests/tab',
                      redirect: '/settingstests/tab/tests',
                     // name: 'Tests',
                    },
                    {
                      path: '/settingstests/tab/tests',
                      component: './settingstests/tab/tests',
                     // name: 'Tests',
                    },
                    {
                      path: '/settingstests/tab/questions',
                      component: './settingstests/tab/questions',
                      //name: 'Questions',
                    },
                   /* {
                      path: '/settingstests/tab/compliances',
                      component: './settingstests/tab/compliances',
                      //name: 'Compliances',
                    },*/
                  ],
                },
              ],
            },
             
            
           /* {
            path: '/exam-tab/tab',
            icon: 'table',
            name: 'exam-tab',
            routes: [
              {
                path: '/exam-tab/tab',
                component: './exam-tab/tab',
                  routes: [
                    {
                      path: '/exam-tab/tab/exams',
                      redirect: '/exam-tab/tab/exams',
                      component: './exam-tab/tab/exams',
                     // name: 'Users',
                    },
                    {
                      path: '/accounts/tab/profile',
                      component: './accounts/tab/profile',
                     // name: 'Profile',

                    },
                    {
                      path: '/accounts/tab/users',
                      component: './accounts/tab/users',
                     // name: 'Users',
                    },
                    {
                      path: '/accounts/tab/tests',
                      component: './accounts/tab/tests',
                      //name: 'Tests',
                    },
                  ],
                },
              ],
            },*/
            //------------
            {
            path: '/accounts/tab',
            icon: 'table',
            name: 'account',
            routes: [
              {
                path: '/accounts/tab',
                component: './accounts/tab',
                  routes: [
                    {
                      path: '/accounts/tab',
                      redirect: '/accounts/tab/users',
                     // name: 'Users',
                    },
                    {
                      path: '/accounts/tab/profile',
                      component: './accounts/tab/profile',
                     // name: 'Profile',

                    },
                    {
                      path: '/accounts/tab/users',
                      component: './accounts/tab/users',
                     // name: 'Users',
                    },
                    {
                      path: '/accounts/tab/tests',
                      component: './accounts/tab/tests',
                      //name: 'Tests',
                    },
                  ],
                },
              ],
            },
            /*{
              path: '/transactions',
              icon: 'bank',
              name: 'Transactions',
              routes: [
                {
                  path: '/transactions',
                  component: './transactions',
                }
              ],
            },*/
            {
              name: 'Transactions',
              icon: 'form',
              path: '/transaction-tab/center',
              routes: [
                {
                  path: '/transaction-tab/center',
                  component: './transaction-tab/center',
                },
                
               
               
              ],
            },
            // {
            // path: '/transactions/tab',
            // icon: 'bank',
            // name: 'Transactions',
            // routes: [
            //   {
            //     path: '/transactions/tab',
            //     component: './transactions/tab',
            //       routes: [
            //         {
            //           path: '/transactions/tab',
            //           redirect: '/transactions/tab/transactionHistory',
            //           name: 'Transaction History',
            //         },
            //         {
            //           path: '/transactions/tab/transactionHistory',
            //           component: './transactions/tab/transactionHistory',
            //           name: 'Transaction History',
            //         },
            //         {
            //           path: '/transactions/tab/divideDetail',
            //           component: './transactions/tab/divideDetail',
            //           name: 'Divide Detail',
            //         },
            //       ],
            //     },
            //   ],
            // },
          /* {
              path: '/sdetail',
             // icon: 'table',
             // name: 'Detail',
              routes: [
                {
                  path: '/sdetail',
                  component: './sdetail',
                }
              ],
            },*/
            
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    '/api': {
     // target: 'https://api.kaonengli.com',
      target: 'https://api-tc.glendot.com',
      changeOrigin: true,
      pathRewrite: { '^api': '' },
    },
  },
  manifest: {
    basePath: '/',
  },
  exportStatic: {},
  esbuild: {},
});
