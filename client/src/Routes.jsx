import React from 'react'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import {
   FixedLayouts,
   PlatformLandingData,
  PlatformData,
  PlatformBookData,
  PlatformCourseData,
  PlatformBlogData,
  PlatformPublisherData,
  PlatformProfileData,
  DashboardSingleBook,

    } from './components/index'

import {
    LandingPage,

    SignInPage,
    SignUpPage,
    AccountRequestPage,

    Notification,
    Chat,
    Cart,

    Home,

    SingleEditElementPage,
    CreateSingleElementPage,
    StatsSingleElementPage,
    StatsSingleProfilePage,
    EditSingleProfilePage,
    CreateSinglePreviewPage,

    FilmsPage,
    FilmsSinglePage,

    SeriesPage,
    SeriesSinglePage,

    BlogsPages,
    SingleBlogPage,

    PublishersPage,
    SinglePublisherPage,

    ProfilePage,
    SingleProfilePage,
    ProfileContentPage,

    ImaSpacePage,
    ImaSpaceRestrictedPage,

    DashboardPage,
    DashboardCreatePage,
    DashboardSinglePage,
    DashboardCreatePreviewPage,
    DashboardSingleStatsPage,

    DashboardBooksPage,
    DashboardCoursesPage,
    DashboardBlogsPage,
    DashboardBugReportsPage,
    DashboardCollaborationsPage,
    DashboardCollaboratorsPage,
    DashboardPartnersPage,
    DashboardUsersProfilePage,
    DashboardPublishersPage,
    DashboardViolationReportsPage,
    PlatformPopulatePage,

    NotFoundPage

  } from './views/index'

const routes = () => {

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<FixedLayouts />}>

        <Route index path='/' element={<LandingPage />}/>

        <Route index path='login' element={<SignInPage />}/>
        {/* <Route index path='register' element={<SignUpPage />}/> */}
        <Route index path='account-request' element={<AccountRequestPage />}/>

        <Route index path='notification' element={<Notification />}/>
        <Route index path='chat' element={<Chat />}/>
        <Route index path='cart' element={<Cart />}/>

        {/* <Route index path='home' element={<Home />}/> */}

        <Route path='books' element={<FilmsPage />} />
        <Route path='books/:id' element={<FilmsSinglePage />} />
        

        <Route path='courses' element={<SeriesPage />} />
        <Route path='courses/:id' element={<SeriesSinglePage />} /> 
        <Route path='courses/:id/edit' element={<SingleEditElementPage />} />
        <Route path='courses/new-course' element={<CreateSingleElementPage />} />

        <Route path='blogs' element={<BlogsPages />} /> 
        <Route path='blogs/:id' element={<SingleBlogPage />} /> 
        <Route path='blogs/:id/edit' element={<SingleEditElementPage />} />
        <Route path='blogs/new-blog' element={<CreateSingleElementPage />} />

        <Route path='publishers' element={<PublishersPage />} /> 
        <Route path='publishers/:id' element={<SinglePublisherPage />} /> 
        <Route path='publishers/:id/edit' element={<EditSingleProfilePage />} /> 
        <Route path='publishers/:id/stats' element={<StatsSingleProfilePage />} />
        <Route path='publishers/:userId/book/:id' element={<ProfileContentPage />} />
        <Route path='publishers/:id/book/:id/edit' element={<SingleEditElementPage />} />
        <Route path='publishers/:id/book/new-book' element={<CreateSingleElementPage />} />
        <Route path='publishers/:id/book/:id/stats' element={<StatsSingleElementPage />} />
        <Route path='publishers/:id/book/new-book/preview' element={<CreateSinglePreviewPage />} />
        <Route path='publishers/:id/course/:id' element={<ProfileContentPage />} />
        <Route path='publishers/:id/course/:id/edit' element={<SingleEditElementPage />} />
        <Route path='publishers/:id/course/:id/stats' element={<StatsSingleElementPage />} />
        <Route path='publishers/:id/course/new-course' element={<CreateSingleElementPage />} />
        <Route path='publishers/:id/course/new-course/preview' element={<CreateSinglePreviewPage />} />
        <Route path='publishers/:id/blog/:id' element={<ProfileContentPage />} />
        <Route path='publishers/:id/blog/:id/edit' element={<SingleEditElementPage />} />
        <Route path='publishers/:id/blog/:id/stats' element={<StatsSingleElementPage />} />
        <Route path='publishers/:id/blog/new-blog' element={<CreateSingleElementPage />} />
        <Route path='publishers/:id/blog/new-blog/preview' element={<CreateSinglePreviewPage />} />
        <Route path='publishers/:id/collaboration/new-collaboration' element={<CreateSingleElementPage />} />
        
        <Route path='/my-profile' element={<SingleProfilePage />} />
        
        <Route path='imaginario-spaces' element={<ProfilePage />} />
        <Route path='imaginario-spaces/:userId/edit' element={<EditSingleProfilePage />} /> 
        <Route path='imaginario-spaces/:userId/stats' element={<StatsSingleProfilePage />} />

        <Route path='imaginario-spaces/:userId/book/new-book' element={<CreateSingleElementPage />} />
        <Route path='imaginario-spaces/:userId/book/:id' element={<ProfileContentPage />} />
        <Route path='imaginario-spaces/:userId/book/:id/edit' element={<SingleEditElementPage />} />
        <Route path='imaginario-spaces/:userId/book/:id/stats' element={<StatsSingleElementPage />} />

        <Route path='imaginario-spaces/:userId/course/new-course' element={<CreateSingleElementPage />} />
        <Route path='imaginario-spaces/:userId/course/:id' element={<ProfileContentPage />} />
        <Route path='imaginario-spaces/:userId/course/:id/edit' element={<SingleEditElementPage />} />
        <Route path='imaginario-spaces/:userId/course/:id/stats' element={<StatsSingleElementPage />} />

        <Route path='imaginario-spaces/:userId/blog/:id' element={<ProfileContentPage />} />
        <Route path='imaginario-spaces/:userId/blog/:id/stats' element={<StatsSingleElementPage />} />
        <Route path='imaginario-spaces/:userId/collaboration/new-collaboration' element={<CreateSingleElementPage />} />
        <Route path='imaginario-spaces/:id/book/collaboration/:collabId/edit' element={<SingleEditElementPage />} />
        <Route path='imaginario-spaces/:id/course/collaboration/:collabId/edit' element={<SingleEditElementPage />} />

        <Route path='my-space/:userId' element={<ImaSpacePage />} />
        <Route path='my-space/:userId/edit' element={<EditSingleProfilePage />} />
        <Route path='imaginario-spaces/:userId' element={<ImaSpacePage />} />
        <Route path='imaginario-restricted-space/:userId' element={<ImaSpaceRestrictedPage />} />

        <Route path='dashboard/landing' element={<DashboardPage />} />
        {/* <Route path='dashboard/create-new' element={<DashboardCreatePage />} /> */}
        
        
        <Route path='dashboard/books' element={<DashboardBooksPage />} />
        <Route path='dashboard/books/new-book' element={<DashboardCreatePage />} />
        <Route path='dashboard/books/new-book/preview' element={<DashboardCreatePreviewPage />} />
        <Route path='dashboard/:userId/book/:id' element={<SingleEditElementPage />} />
        <Route path='dashboard/books/:id/preview' element={<DashboardCreatePreviewPage />} />
        <Route path='dashboard/books/:id/stats' element={<DashboardSingleStatsPage />} />

        <Route path='dashboard/courses' element={<DashboardCoursesPage />} />
        <Route path='dashboard/courses/new-course' element={<DashboardCreatePage />} />
        <Route path='dashboard/courses/new-course/preview' element={<DashboardCreatePreviewPage />} />
        <Route path='dashboard/:userId/course/:id' element={<SingleEditElementPage />} />
        <Route path='dashboard/courses/:id/preview' element={<DashboardCreatePreviewPage />} />
        <Route path='dashboard/courses/:id/stats' element={<DashboardSingleStatsPage />} />

        <Route path='dashboard/blogs' element={<DashboardBlogsPage />} />
        <Route path='dashboard/blogs/new-blog' element={<DashboardCreatePage />} />
        <Route path='dashboard/blogs/new-blog/preview' element={<DashboardCreatePreviewPage />} />
        <Route path='dashboard/blogs/:id' element={<DashboardSinglePage />} />
        <Route path='dashboard/blogs/:id/preview' element={<DashboardCreatePreviewPage />} />
        <Route path='dashboard/blogs/:id/stats' element={<DashboardSingleStatsPage />} />

        <Route path='dashboard/incidents' element={<DashboardBugReportsPage />} />
        <Route path='dashboard/incidents/new-incident' element={<DashboardCreatePage />} />
        <Route path='dashboard/incidents/:id' element={<DashboardSinglePage />} />

        <Route path='dashboard/collaborations' element={<DashboardCollaborationsPage />} />
        <Route path='dashboard/collaborations/new-collaboration' element={<DashboardCreatePage />} />
        <Route path='dashboard/collaborations/:id' element={<DashboardSinglePage />} />

        <Route path='dashboard/collaborators' element={<DashboardCollaboratorsPage />} />
        <Route path='dashboard/collaborators/new-collaborator' element={<DashboardCreatePage />} />
        <Route path='dashboard/collaborators/:id' element={<DashboardSinglePage />} />

        <Route path='dashboard/partners' element={<DashboardPartnersPage />} />
        <Route path='dashboard/partners/new-partner' element={<DashboardCreatePage />} />
        <Route path='dashboard/partners/:id' element={<DashboardSinglePage />} />

        <Route path='dashboard/users' element={<DashboardUsersProfilePage />} />
        <Route path='dashboard/users/new-user' element={<DashboardCreatePage />} />
        <Route path='dashboard/users/:userId' element={<DashboardSinglePage />} />

        <Route path='dashboard/publishers' element={<DashboardPublishersPage />} />
        <Route path='dashboard/publishers/new-publisher' element={<DashboardCreatePage />} />
        <Route path='dashboard/publishers/:id' element={<DashboardSinglePage />} />

        <Route path='dashboard/violations' element={<DashboardViolationReportsPage />} />
        <Route path='dashboard/violations/new-violation-report' element={<DashboardCreatePage />} />
        <Route path='dashboard/violations/:id' element={<DashboardSinglePage />} />

        <Route path='dashboard/platform-data' element={<PlatformPopulatePage />}>
        <Route path='landing' element={<PlatformLandingData title={'Landind Carousel'}/>} />
        <Route path='books' element={<PlatformBookData />} />
        <Route path='courses' element={<PlatformCourseData />} />
        <Route path='blogs' element={<PlatformBlogData />} />
        <Route path='publishers' element={<PlatformPublisherData />} />
        <Route path='profiles' element={<PlatformProfileData />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />

      </Route>
    )
)
  return (
    <RouterProvider router={router}/>
  )
}

export default routes
