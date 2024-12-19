import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {InputsVideo, SelectsVideo, AddedElementVideo} from '../../index'
import {list} from '../../../data/carousel'
import {useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {axiosInstance} from '../../../fetch/axiosConfig'


const DashboardSingleCollaboration = ({FetchedData, FetchedPlatforms, FetchedCollab, currentUser}) => {
  const { collabId } = useParams();
  const [sellingPlatData, setSellingPlatData] = useState([])
  const [sellingPlatsSelect, setSellingPlatsSelect] = useState([])
  const [editSellingPlat, setEditSellingPlat] = useState(false)
  const [platformImage, setPlatformImage] = useState()
  const [item_Id, setItem_Id] = useState('')
  const [loadingSave, setLoadingSave] = useState(false);
  const { id } = useParams();

const [newPost, setNewPost] = useState({})
const [newItemLink, setNewItemLink] = useState({
  productLink: ''
})
const [newAffiliatePlats, setNewAffiliatePlats] = useState({
  // contentLanguage: lng,
  platformName: '',
  platformNameNotListed: undefined,
  allowsAffiliateLink: undefined,
  bookLink: '',
  imaginarioBookLink: '',
  platformListed: undefined
})

let collabData

const getPost = (e) => {

  if([e.target.id] in newPost){
    setNewPost((prev) => ({...prev, [e.target.id]: e.target.value} )) 
  }
  }
  const getNewAffiliatePlats = (e) => {
    setNewAffiliatePlats((prev) => ({...prev, [e.target.id]: e.target.value} ))
  }


  
 // SELLING PLATFORM
 const handlePlatforms = async (method, action, elemId ) => { 
  if (loadingSave === true) return; // Prevent multiple clicks

  if(action === 'delete'){
     // Show confirmation prompt
  const isConfirmed = window.confirm("Are you sure you want to delete this chapter?");

  // If user clicks 'Cancel', don't proceed
  if (!isConfirmed) return;
  }
  setLoadingSave(true);


  try {
    const res = await axiosInstance.put(`/books/${id}/${method ? 'addplatform' : `platform/${item_Id || elemId}/${action}`}`, (method || action === 'update') ? newAffiliatePlats : "");
    if(method){
      setLoadingSave(false);
      setItem_Id('')
      setNewAffiliatePlats({
        // contentLanguage: lng,
        platformName: '',
        platformNameNotListed: '',
        allowsAffiliateLink: '',
        bookLink: '',
        imaginarioBookLink: ''
      })
      setSellingPlatData([...res?.data?.data])
      setEditSellingPlat(false)
      toast.success('Platform Added!')
      // return setSellingPlatData(res?.data?.data)
    }
    if(action){
      setLoadingSave(false);
      setItem_Id('')
      setNewAffiliatePlats({
        // contentLanguage: lng,
        platformName: '',
        platformNameNotListed: '',
        allowsAffiliateLink: '',
        bookLink: '',
        imaginarioBookLink: ''
      })
      setSellingPlatData([...res?.data?.data])
      setEditSellingPlat(false)
      toast.success(action === 'update' ? 'Platform Updated!' : 'Platform Deleted!')
      // return setSellingPlatData([...res?.data?.data])
    }
    
  } catch (error) {
    console.error('Error sadiing book:', error?.response?.data?.error || error);
    setLoadingSave(false);
    toast.error(error?.response?.data?.error || error?.message)
  }
}

 // UPLOAD FILES
 const handleFileUpload = async (action, platformId) => { 
  if (loadingSave === true) return; // Prevent multiple clicks
  if (action === 'coverImage' && !imageCover) {
    alert("Please select an image to upload.");
    return;
}
if (action === 'bookPdf' && !pdfBook) {
  alert("Please select a PDF file to upload.");
  return;
}
  setLoadingSave(true)

  const formData = new FormData();
      formData.append('file', action === 'addcoverimage' ? imageCover : action === 'addbookpdf' ? pdfBook : action === 'upload-plat-image' ? platformImage : '');  // 'image' should match your backend field
      
  try {
    const res = await axiosInstance.put((action === 'upload-plat-image' || action === 'delete-plat-image' ) ? `/books/${id}/platform/${platformId}/${action}` : `/books/${id}/${action}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
    }
    });
    if(action === 'upload-plat-image'){
      setLoadingSave(false);
      toast.success('Success upload!')
      setPlatformImage(res?.data?.data);
      return setSellingPlatData(res?.data?.data)
    }
    if(action === 'delete-plat-image'){
      setLoadingSave(false);
      toast.success('Image Deleted!')
      setPlatformImage(res?.data?.data);
      return setSellingPlatData(res?.data?.data)
    }

  } catch (error) {
    console.error('Error handling book:', error?.response?.data?.error || error);
    setLoadingSave(false);
    toast.error(error?.response?.data?.error || error?.message)  
  }
}

  // useEffect(() => {
  //   collabData = collabs ? collabs?.filter(item => item?.collaboratorId === currentUser?._id)[0] : {}
  // }, [ , collabData])

  // useEffect(() => {
  //   setNewPost({
  //    denialReason: collabData?.denialReason,
  //    status: collabData?.status,
  //    display: collabData?.display,
  //   })
  // }, [ , collabData])

  useEffect(() => {
    setSellingPlatData(FetchedData?.platforms)
    setNewPost({
      denialReason: FetchedCollab?.denialReason,
      status: FetchedCollab?.status,
      display: FetchedCollab?.display,
    })
  }, [ , FetchedCollab])

  useEffect(() => {
    setSellingPlatData(sellingPlatData)
  }, [sellingPlatData, editSellingPlat, platformImage])

  useEffect(() => {
    FetchedPlatforms && FetchedPlatforms?.map((item) => !sellingPlatsSelect.includes(item?.platformName) && setSellingPlatsSelect([...sellingPlatsSelect, item?.platformName]))
  }, [, FetchedPlatforms])

  useEffect(() => {
    const lk = FetchedPlatforms ? FetchedPlatforms.filter(item => item?.platformName === newAffiliatePlats.platformName)[0]?.platformURL : ''

      newAffiliatePlats?.platformName === "Not Found" ? setNewAffiliatePlats({...newAffiliatePlats, platformListed: false, bookLink: undefined, imaginarioBookLink: undefined})
    : setNewAffiliatePlats({...newAffiliatePlats, platformListed: true, bookLink: lk, imaginarioBookLink: lk})
  }, [newAffiliatePlats.platformName])

    console.log(FetchedCollab) 

    if(!FetchedData) return <div className='loading'></div>
  return (
    <Wrapper>
    <div className='create-book-container' >
     
     <div className='header'>
      <div className='action-btn'>
        <button type='button' >Save</button>
        <button type='button' className='mx-3'>Cancel</button>
        <button type='button'>Stats</button>
      </div>
      </div>

      <h2 className='m-0 my-2 text-dark'>Collaboration</h2>
      <div className='inputs'>
        <SelectsVideo text={'Status'} inputId={'status'} OnOff={false}
        selectItems={['pending', 'active', 'Denied']} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Display'} inputId={'display'}
        selectItems={['show', 'hide']} newPost={newPost} getPost={getPost}/>
      
       {newPost?.status === 'denied' && <InputsVideo text={'Denial Reason'} inputId={'denialReason'} newPost={newPost} getPost={getPost}/>}

        <InputsVideo text={`${FetchedCollab?.contentType === 'book' ? 'Book Owner' : 'Course Owner'}`} inputId={'username'} newPost={FetchedCollab?.ownerId} getPost={getPost} disable={true}/>
        <InputsVideo text={'Collaboration Owner'} inputId={'username'} newPost={FetchedCollab?.collaboratorId} getPost={getPost} disable={true} />

        <InputsVideo text={'Creation Date'} inputId={'createdAt'} newPost={FetchedCollab} getPost={getPost} disable={true} dataType={"date"}/>
        <InputsVideo text={'Update Date'} inputId={'updatedAt'} newPost={FetchedCollab} getPost={getPost} disable={true} dataType={"date"}/>
      </div>

      {/* PLATFORMS */}
      {/* <div className='sections '>
      <h4 className='m-0 my-3 text-dark'>Selling Platform</h4>
      <div className='div-border'>
      <div className='inputs5'> 
        <SelectsVideo text={'Platform Name'} inputId={'platformName'}
          selectItems={[...sellingPlatsSelect,"Not Found"]} change={'platform'} newPost={newAffiliatePlats} getPost={getNewAffiliatePlats}/>
          {newAffiliatePlats?.platformName === "Not Found" && 
          <>
          <InputsVideo text={'Platform Not listed'} inputId={'platformNameNotListed'} change={'platform'} newPost={newAffiliatePlats} getPost={getNewAffiliatePlats}/>
          <SelectsVideo text={'Allow Affiliate Link?'} inputId={'allowsAffiliateLink'}
          selectItems={["Yes","No"]} change={'platform'} newPost={newAffiliatePlats} getPost={getNewAffiliatePlats}/>
          </>}
          <InputsVideo text={'Book Link'} inputId={'bookLink'} change={'platform'} newPost={newAffiliatePlats} getPost={getNewAffiliatePlats}/>
          {currentUser?.role === "admin" && <InputsVideo text={'Imaginario Link'} inputId={'imaginarioBookLink'} change={'platform'} newPost={newAffiliatePlats} getPost={getNewAffiliatePlats}/>}
          <div className='add-link-div'>
          <button type='button' className='add-link mx-1' onClick={() => handlePlatforms(!editSellingPlat && 'POST', 'update', )}> {editSellingPlat ? 'Update' : 'Add'}</button> 
          <button type='button' className='add-link' 
          onClick={() =>{
            setNewAffiliatePlats({
              // contentLanguage: lng,
              platformName: '',
              platformNameNotListed: '',
              allowsAffiliateLink: '',
              bookLink: ''
          })}}>Clear</button> 
          </div>
      </div>
      <AddedElementVideo 
      list={sellingPlatData}  
      newPost={sellingPlatData} 
      setItem_Id={setItem_Id}
      item_Id={item_Id}
      setEditMode={setEditSellingPlat}
      handleFunctionDelete={handlePlatforms} 
      setUpdateObj={setNewAffiliatePlats} 
      handleFileUpload={handleFileUpload}
      setPlatformImage={setPlatformImage}
      handleType={'platform'}  
      currentUser={currentUser}
      />
      </div>
      </div> */}

      <div className=''>
      <h4 className='m-0 my-3 text-dark'>Selling Platform</h4>
      {sellingPlatsSelect?.sort((a, b) => a - b)?.map((item, index) => {

        return(
          <div className='d-flex' key={index}>
            {/* <div className="input-group">
            <div className="input-group-prepend">
            <span className="input-group-text">Platform</span>
            </div>
            <input className="form-control" type={'text'} id={""} 
            value={item} onChange={(e) =>getPost(e)}
            />
            </div>

            <div className="input-group">
            <div className="input-group-prepend">
            <span className="input-group-text">{`${FetchedCollab?.contentType === 'book' ? 'Book Link' : 'Course Link'}`}</span>
            </div>
            <input className="form-control" type={'text'} id={""} 
            value={""} onChange={(e) =>getPost(e)}
            />
            </div> */}

            <input className="form-control my-1" type={'text'} id={""} 
            value={item} disabled onChange={(e) =>getPost(e)}
            />
            <input className="form-control mx-4 my-1" type='link' id={""} 
             onChange={(e) =>getPost(e)}
            />

            <div className='add-link-div'>
            <button className='add-link border-0 mx-2'>
              Save
            </button>
            <button className='add-link border-0'>
              Clear
            </button>
          </div>
          </div>
        )
      })}
      </div>
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.create-book-container{
  .sections-containers{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    
  .sections{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  }
  
  .header{
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    span, select{
      border-radius: var(--borderRadius);
      background-color: var(--color-12);
      color: var(--color-1);
      padding: 2px 10px;
      font-size: 10px;
    }
  .action-btn{
    margin: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    button{
      border: none;
      border-radius: var(--borderRadius);
      padding: 2px 10px;
      background-color: var(--color-12);
      color: var(--color-1);
    }
    button:hover{
      background-color: var(--color-4);
      color: var(--color-1);
    }
  }
}
  .inputs, .inputs4, .inputs5 {
    display: grid;
    
  }



  .add-link-div{
    display: flex;
    justify-content: end;
    align-items: end;
  .add-link{
    border: none;
    background-color: var(--color-12);
    color: var(--color-1);
    border-radius: var(--borderRadius);
    padding: 5px 10px;
    width: 100%;
  }
  .add-link:hover{
      background-color: var(--color-4);
      color: var(--color-1);
    }
  }
}

.language-select-div {

  select{
    width: 5rem;
    background-color: var(--color-6);
  }
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.create-book-container{
  .inputs{
    grid-template-columns: repeat(2,1fr);
    gap: 20px;
  }

  .inputs4{
    grid-template-columns: repeat(4,1fr);
    gap: 20px;
  }
  .inputs5{
    grid-template-columns: repeat(5,1fr);
    gap: 20px;
  }
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
.create-book-container{
  margin-bottom: 3rem;
  .inputs{
    grid-template-columns: repeat(2,1fr);
    gap: 20px;
  }
  .inputs4{
    grid-template-columns: repeat(4,1fr);
    gap: 20px;
  }
  .inputs5{
    grid-template-columns: repeat(5,1fr);
    gap: 20px;
  }
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.create-book-container{
  .inputs, .inputs4, .inputs5 {
    grid-template-columns: repeat(1, 1fr);
    gap: 0px;
  }

  .add-link-div{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  .add-link{
    padding: 5px 10px;
    width: 80%;
  }
}
}
}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default DashboardSingleCollaboration
