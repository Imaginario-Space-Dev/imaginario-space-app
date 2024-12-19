import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Inputs, Selects, SelectsVideo , InputDateTimeVideo, InputNumber, AddedElementVideo , InputsVideo, TextAreasVideo ,  AddedElement, UploadCoverImg, TextAreas, InputNumberVideo, FileInputVideo} from '../../index'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import {genreList, targetAdienceList} from '../../../utils/utils'
import {useParams, useLocation, useSearchParams} from 'react-router-dom';
import {axiosInstance} from '../../../fetch/axiosConfig'

const DashboardSingleBook = ({FetchedData, FetchedPlatforms, currentUser}) => {
  const [contentData, setContentData] = useState(FetchedData)
  const [affiliateIndex, setAffiliateIndex] = useState()
  const [imageCover, setImageCover] = useState()
  const [pdfBook, setPdfBook] = useState()
  const [platformImage, setPlatformImage] = useState()
  const [chapterData, setChapterData] = useState([])
  const [editChapter, setEditChapter] = useState(false)
  const [sellingPlatData, setSellingPlatData] = useState([])
  const [sellingPlatsSelect, setSellingPlatsSelect] = useState([])
  const [editSellingPlat, setEditSellingPlat] = useState(false)
  const [promotionData, setPromotionData] = useState([])
  const [editPromo, setEditPromo] = useState(false)
  const [item_Id, setItem_Id] = useState('')
  const [loadingSave, setLoadingSave] = useState(false);
  const [editorData, setEditorData] = useState('');
  const { id } = useParams();

  const [lng, setLng] = useState('EN')
  
  let [newPost, setNewPost] = useState({})

const [newChapter, setNewChapter] = useState({
  chapterLanguage: lng,
  chapterTitle: '',
  chapterLocked: '',
  contentFormat: '',
  startingPage: undefined,
  videoFile: '',
  startingPage: '',
  pdfFile: ''
})

const [newAffiliatePlats, setNewAffiliatePlats] = useState({
  contentLanguage: lng,
  platformName: '',
  platformNameNotListed: undefined,
  allowsAffiliateLink: undefined,
  bookLink: '',
  imaginarioBookLink: '',
  platformListed: undefined
})

// const [newPromotion, setNewPromotion] = useState({
//   reduction: undefined,
//   displayPeriodStart: undefined,
//   displayPeriodEnd: undefined,
//   status: '',
//   platforms: [],
// })
const [newPromotion, setNewPromotion] = useState({})


const getPost = (e) => {
  const id = e.target.id;
  const value = e.target.value;
  const checked = e.target.checked;
  const type = e.target.type;

  if (e.target.multiple) {
    setNewPost((prev) => {
      if(id === 'targetAudience') {
        const targetAudience =  prev.targetAudience ? [...prev.targetAudience] : []; // Copy the existing array
      if (targetAudience.includes(value)) {
        // If the option is already selected, remove it
        return {
          ...prev,
          [id]: targetAudience.filter((item) => item !== value),
        };
      } else {
        // Otherwise, add it to the array
        return {
          ...prev,
          [id]: [...targetAudience, value],
        };
      }
      } else if(id === 'genre') {
        const genre = prev.genre ? [...prev.genre] : []; // Copy the existing array
        if (genre.includes(value)) {
          // If the option is already selected, remove it
          return {
            ...prev,
            [id]: genre.filter((item) => item !== value),
          };
        } else {
          // Otherwise, add it to the array
          return {
            ...prev,
            [id]: [...genre, value],
          };
        }
      }
    });
  } else  {
    // const evt = e.target.value ? { [id]: e.target.value } : { [id]: e.target.checked };
    // setNewPost((prev) => ({ ...prev, ...evt }));
    let evt;

  if (type === "checkbox") {
    evt = { [id]: checked };  // For checkboxes, use the checked property
  } else {
    evt = { [id]: value };  // For text inputs, use the value property
  }

  setNewPost((prev) => ({
    ...prev,
    ...evt,
  }));
  }
};


const getNewChapter = (e) => {
  setNewChapter((prev) => ({...prev, [e.target.id]: e.target.value} ))
}

const getNewAffiliatePlats = (e) => {
  setNewAffiliatePlats((prev) => ({...prev, [e.target.id]: e.target.value} ))
}

const getNewPromotion = (e) => {
  const id = e.target.id;
  const value = e.target.value;
  console.log(e.target.multiple)
  if (e.target.multiple) {
    setNewPromotion((prev) => {
      if(id === 'platforms') {
        const platforms = prev.platforms ? [...prev.platforms] : []; // Copy the existing array
      if (platforms.includes(value)) {
        // If the option is already selected, remove it
        return {
          ...prev,
          [id]: platforms.filter((item) => item !== value),
        };
      } else {
        // Otherwise, add it to the array
        return {
          ...prev,
          [id]: [...platforms, value],
        };
      }
      }
    });
  } else  {
    // const evt = e.target.value ? { [id]: e.target.value } : { [id]: e.target.checked };
    // setNewPost((prev) => ({ ...prev, ...evt }));
    let evt

    if(id === 'reduction') {
      evt = { [id]: parseFloat(value) };  // For checkboxes, use the checked property
    } else {
      evt = { [id]: value };  // For text inputs, use the value property
    }

    setNewPromotion((prev) => ({
    ...prev,
    ...evt,
  }));
  }
};

const getImageCover = (e) => {
  setImageCover(e.target.files[0]);
}

const getPdfBook = (e) => {
  setPdfBook(e.target.files[0]);
}


const handleSaveBook = async () => {
        
  if (loadingSave === true) return; // Prevent multiple clicks

  setLoadingSave(true);
  
  try {
    const res = await axiosInstance.put(`/books/${id}`, newPost);
    setContentData(res?.data?.data)
    setLoadingSave(false);
    toast.success('Upload Successfully!')

  } catch (error) {
    console.error('Error saving book:', error?.response?.data?.error || error);
    setLoadingSave(false);
    toast.error(error?.response?.data?.error || error?.message)
  }
};

    
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
      if(action === 'addcoverimage'){
        setLoadingSave(false);
        toast.success('Success upload!')
        return setImageCover(res?.data?.data)
      }
      if(action === 'deletecoverimage'){
        setLoadingSave(false);
        toast.success('Image Deleted!')
        return setImageCover({})
      }
      if(action === 'addbookpdf'){
        setLoadingSave(false);
        toast.success('Success upload!')
        return setPdfBook(res?.data?.data)
      }
      if(action === 'deletebookpdf'){
        setLoadingSave(false);
        toast.success('File Deleted!')
        return setPdfBook('')
      }
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

    // ADD PROMOTION
    const handlePromotion = async (itemId) => { 
      if (loadingSave === true) return; // Prevent multiple clicks
     
      setLoadingSave(true);
  
      try {
        const res = await axiosInstance.put(`/books/${itemId}/promotion`, newPromotion);
          setLoadingSave(false);
          setNewPromotion(res?.data?.data)
          toast.success('Promotion Updated')
      } catch (error) {
        console.error('Error handling promotion:', error?.response?.data?.error || error);
        setLoadingSave(false);
        toast.error(error?.response?.data?.error || error?.message)
      }
    }
  
   // UPLOAD CHAPTERS
   const handleChapter= async (method, action, elemId ) => { 
    if (loadingSave === true) return; // Prevent multiple clicks
//     if (action === 'coverImage' && !imageCover) {
//       alert("Please select an image to upload.");
//       return;
//   }
//   if (action === 'bookPdf' && !pdfBook) {
//     alert("Please select a PDF file to upload.");
//     return;
// }

    if(action === 'delete'){
       // Show confirmation prompt
    const isConfirmed = window.confirm("Are you sure you want to delete this chapter?");

    // If user clicks 'Cancel', don't proceed
    if (!isConfirmed) return;
    }
    setLoadingSave(true);


    try {
      const res = await axiosInstance.put(`/books/${id}/${method ? 'addchapter' : `chapter/${item_Id || elemId}/${action}`}`, (method || action === 'update') ? newChapter : "");
      if(method){
        setLoadingSave(false);
        setItem_Id('')
        setNewChapter({
          chapterLanguage: lng,
          chapterTitle: '',
          chapterLocked: '',
          contentFormat: '',
          startingPage: undefined,
          videoFile: '',
          startingPage: '',
          pdfFile: ''
        
        })
        setEditChapter(false)
        setChapterData(res?.data?.data)
        toast.success('Chapter Created!')
        return setChapterData(res?.data?.data)
      }
      if(action){
        setLoadingSave(false);
        setItem_Id('')
        setNewChapter({
          chapterLanguage: lng,
          chapterTitle: '',
          chapterLocked: '',
          contentFormat: '',
          startingPage: undefined,
          videoFile: '',
          startingPage: '',
          pdfFile: ''
        
        })
        setChapterData([...res?.data?.data])
        setEditChapter(false)
        toast.success(action === 'update' ? 'Chapter Updated!' : 'Chapter Deleted!')
        // return setChapterData([...res?.data?.data])
      }
      
    } catch (error) {
      console.error('Error sadiing book:', error?.response?.data?.error || error);
      setLoadingSave(false);
      toast.error(error?.response?.data?.error || error?.message)
    }
  }

 // SELLING PLATFORM
 const handlePlatforms = async (method, action, elemId ) => { 
  if (loadingSave === true) return; // Prevent multiple clicks
//     if (action === 'coverImage' && !imageCover) {
//       alert("Please select an image to upload.");
//       return;
//   }
//   if (action === 'bookPdf' && !pdfBook) {
//     alert("Please select a PDF file to upload.");
//     return;
// }

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
        contentLanguage: lng,
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
        contentLanguage: lng,
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

  // CANCEL BUTTON
  const handleCancel = (action) => {

    if(action === 'bookInfo') {
      return setNewPost({
        language: [lng],
      title: FetchedData?.title,
      // ownership: FetchedData?.ownership,
      author: FetchedData?.author,
      category: FetchedData?.category,
      genre: FetchedData?.genre,
      targetAudience: FetchedData?.targetAudience,
      status: FetchedData?.status,
      visibility: FetchedData?.visibility,
      desc: FetchedData?.desc,
      tags: FetchedData?.tags,
      allowAffiliate: FetchedData?.allowAffiliate,
    })
  }
}

  useEffect(() => {
    setContentData(FetchedData)
    setChapterData(FetchedData?.chapterList)
    setSellingPlatData(FetchedData?.platforms)
    setPromotionData(FetchedData?.promotion)
    setImageCover(FetchedData?.coverImage)
    setPdfBook(FetchedData?.bookPDF)
    setEditorData(FetchedData?.desc || "")
    setNewPost({
      language: [lng],
      title: FetchedData?.title,
      // ownership: FetchedData?.ownership,
      author: FetchedData?.author,
      category: FetchedData?.category,
      genre: FetchedData?.genre,
      targetAudience: FetchedData?.targetAudience,
      status: FetchedData?.status,
      visibility: FetchedData?.visibility,
      desc: FetchedData?.desc || "",
      tags: FetchedData?.tags,
      allowAffiliate: FetchedData?.allowAffiliate,
    })
  }, [ , FetchedData])

  useEffect(() => {
    setNewPost({...newPost, desc: editorData})
  }, [editorData])

  useEffect(() => {
    setChapterData(chapterData)
  }, [chapterData, editChapter])

  useEffect(() => {
    setSellingPlatData(sellingPlatData)
  }, [sellingPlatData, editSellingPlat, platformImage])

  useEffect(() => {
    FetchedPlatforms && FetchedPlatforms?.map((item) => !sellingPlatsSelect.includes(item?.platformName) && setSellingPlatsSelect([...sellingPlatsSelect, item?.platformName]))
  }, [, FetchedPlatforms])

  useEffect(() => {
    const link = FetchedPlatforms ? FetchedPlatforms.filter(item => item?.platformName === newAffiliatePlats.platformName)[0]?.platformURL : ''
    const image = FetchedPlatforms ? FetchedPlatforms.filter(item => item?.platformName === newAffiliatePlats.platformName)[0]?.image : ''
    const imageOriginalName = FetchedPlatforms ? FetchedPlatforms.filter(item => item?.platformName === newAffiliatePlats.platformName)[0]?.imageOriginalName : ''
     
    newAffiliatePlats?.platformName === "Not Found" ? setNewAffiliatePlats({...newAffiliatePlats, platformListed: false, bookLink: '', 
      imaginarioBookLink: '', imageName: undefined, imageOriginalName: undefined, allowsAffiliateLink: ""})
    : setNewAffiliatePlats({...newAffiliatePlats, platformListed: true, bookLink: link, imaginarioBookLink: link,
      imageName: image, imageOriginalName: imageOriginalName, allowsAffiliateLink: true, platformNameNotListed: undefined})
  }, [newAffiliatePlats.platformName])

  useEffect(() => {
    newChapter.contentFormat === "PDF" ? setNewChapter({...newChapter, videoFile: ''})
    : setNewChapter({...newChapter, startingPage: ''})
  }, [newChapter.contentFormat])

  useEffect(() => {
    setNewPromotion({
      reduction:  FetchedData?.promotion?.reduction || undefined,
      displayPeriodStart: FetchedData?.promotion?.displayPeriodStart || undefined,
      displayPeriodEnd: FetchedData?.promotion?.displayPeriodEnd || undefined,
      platforms: FetchedData?.promotion?.platforms || undefined,
      status: FetchedData?.promotion?.status || false,
    })
  }, [ , FetchedData?.promotion])

  // console.log(FetchedData?.platforms)
  // console.log(newAffiliatePlats)

  if(!FetchedData || !FetchedPlatforms) return <div className="loading"></div>

  return (
    <Wrapper>
    <div className='create-book-container' >
     
     <div className='header'>
     {/* d-flex justify-content-between align-items-center */}
      <div className='d-flex justify-content-start align-items-center'>

        <select className='' name="" id="" value={lng} onChange={(e) => setLng(e.target.value)}>
        <option value='' className='d-none'></option>
        <option value='EN'>EN</option>
        <option value='PT'>PT</option>
      </select>

      <div className='action-btn mx-1'>
        <Link to={`/imaginario-spaces/${currentUser?._id}/book/new-book?languageTrackId=7478347847383874`} type='button' className=''>+Language</Link>
      </div>
   </div>

   <div className='add-link-div'>
        <button type='button' className='add-link mx-1' onClick={handleSaveBook} >Save</button>
        <button type='button' className='add-link' onClick={() => handleCancel('bookInfo')}>Cancel</button>
      </div>
  </div>

      
      
      <div className='inputs'>
        <InputsVideo text={'Title'} inputId={'title'} newPost={newPost} getPost={getPost}/>
        <InputsVideo text={'Author'} inputId={'author'} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Category'} inputId={'category'}
        selectItems={["Fiction","Non-Fiction"]} newPost={newPost} getPost={getPost}/>
         <SelectsVideo text={'Status'} inputId={'status'}
        selectItems={['pending', 'active', 'Denied']} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Genre'} inputId={'genre'}
        selectItems={genreList.sort()} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Target Audiences'} inputId={'targetAudience'}
        selectItems={targetAdienceList.sort()} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Visibility'} inputId={'visibility'}
        selectItems={['hidden', 'show']} newPost={newPost} getPost={getPost}/>
         <InputsVideo text={'Created By'} inputId={'username'} newPost={contentData?.createdBy} getPost={getPost}/>
        <InputsVideo text={'Publication Date'} inputId={'createdAt'} newPost={contentData} getPost={getPost} dataType={"date"}/>
        <InputsVideo text={'Last Update'} inputId={'updatedAt'} newPost={contentData} getPost={getPost} dataType={"date"}/>
      </div>
      

      <div >
      <TextAreasVideo text={'Book Description'} inputId={'desc'} newPost={newPost} getPost={getPost} editorData={editorData} setEditorData={setEditorData}/>
      <TextAreasVideo text={'Tags'} inputId={'tags'} newPost={newPost} getPost={getPost}/>
      </div>

    {/* UPLOAD COVER */}
    <div className='sections'>
      <h4 className='m-0 my-3 text-dark'>Book Cover Image</h4>
      <div className='div-border'>
        <div className='inputs'>
        <UploadCoverImg text={'Upload cover image'} inputId={'name'} list={contentData} newPost={imageCover} getPost={getImageCover}/>
        </div>
        <div className='add-link-div'>
        <button type='button' className='add-link mx-1' onClick={() => handleFileUpload('addcoverimage')} disabled={!imageCover?.name}>Upload</button>
        <button type='button' className='add-link' onClick={() => handleFileUpload('deletecoverimage')}  disabled={!imageCover?.name}>Delete</button> 
        </div>
        </div>
      </div>

      {/* UPLOAD COVER */}
    <div className='sections'>
      <h4 className='m-0 my-3 text-dark'>Book PDF</h4>
      <div className='div-border'>
        <div className='inputs'>
        <UploadCoverImg text={'Upload PDF file'} inputId={'name'} list={contentData} newPost={pdfBook} getPost={getPdfBook}/>
        </div>
        <div className='add-link-div'>
        <button type='button' className='add-link mx-1' onClick={() => handleFileUpload('addbookpdf')} disabled={!pdfBook?.name}>Upload</button>
        <button type='button' className='add-link' onClick={() => handleFileUpload('deletebookpdf')} disabled={!pdfBook?.name}>Delete</button> 
        </div>
        </div>
      </div>
     
      {/* BOOK CHAPTERS */}
      <div className='sections  '>
      <h4 className='m-0 my-3 text-dark'>Book Chapters</h4>
      <div className='div-border'>
      <div className='inputsd'>
        <div className='inputs5'>
          <InputsVideo text={'Chapter Title'} inputId={'chapterTitle'} change={'chapter'}  newPost={newChapter} getPost={getNewChapter}/>
          <SelectsVideo text={'Locked?'} inputId={'chapterLocked'}
          selectItems={["Locked","Unlocked"]} change={'chapter'} newPost={newChapter} getPost={getNewChapter}/>
          <SelectsVideo text={'Format'} inputId={'contentFormat'} 
          selectItems={['PDF', 'video']} change={'chapter'} newPost={newChapter} getPost={getNewChapter}/>
          {newChapter.contentFormat === 'PDF' 
          &&
          <InputNumberVideo text={'Starting Page'} inputId={'startingPage'} change={'chapter'}  newPost={newChapter} getPost={getNewChapter}/>}
          {newChapter.contentFormat === 'video' &&
          <InputsVideo text={'Upload video link'} inputId={'videoFile'} change={'chapter'}  newPost={newChapter} getPost={getNewChapter}/>}
        </div>
          <div className='add-link-div'>
          <button type='button' className='add-link mx-1' onClick={() => handleChapter(!editChapter && 'POST', 'update', )}> {editChapter ? 'Update' : 'Add'}</button>
          <button type='button' className='add-link' 
          onClick={() => { 
            setNewChapter({  
              chapterLanguage: lng,
              chapterTitle: '',
              chapterLocked: '',
              contentFormat: '',
              startingPage: undefined,
              videoFile: '',
              pdfFile: ''})  
            setEditChapter(false)} 
            }>Clear</button>
          </div>         
          </div>
          <AddedElementVideo 
          list={chapterData}  
          newPost={chapterData} 
          setItem_Id={setItem_Id}
          item_Id={item_Id}
          setEditMode={setEditChapter}
          handleFunctionDelete={handleChapter} 
          setUpdateObj={setNewChapter} 
          handleType={'bookContent'}
          contentType={'book'}/>
          
          </div>
      </div>

      {/* PLATFORMS */}
      <div className='sections '>
      <h4 className='m-0 my-3 text-dark'>Selling Platform</h4>
      <div className='div-border'>
      <div className='inputs5'> 
        <SelectsVideo text={'Platform Name'} inputId={'platformName'}
          selectItems={[...sellingPlatsSelect,"Not Found"]} change={'platform'} newPost={newAffiliatePlats} getPost={getNewAffiliatePlats}/>
          {newAffiliatePlats?.platformName === "Not Found" && 
          <InputsVideo text={'Platform Not listed'} inputId={'platformNameNotListed'} change={'platform'} newPost={newAffiliatePlats} getPost={getNewAffiliatePlats}/>}
          {newAffiliatePlats.platformName === 'Not Found' && 
          <SelectsVideo text={'Allow Affiliate Link?'} inputId={'allowsAffiliateLink'}         
          selectItems={["Yes","No"]} change={'platform'} newPost={newAffiliatePlats} getPost={getNewAffiliatePlats}/>}
          <InputsVideo text={'Book Link'} inputId={'bookLink'} change={'platform'} newPost={newAffiliatePlats} getPost={getNewAffiliatePlats}/>
          {currentUser?.role === "admin" && <InputsVideo text={'Imaginario Link'} inputId={'imaginarioBookLink'} change={'platform'} newPost={newAffiliatePlats} getPost={getNewAffiliatePlats}/>}
          <div className='add-link-div'>
          <button type='button' className='add-link mx-1' onClick={() => handlePlatforms(!editSellingPlat && 'POST', 'update', )}> {editSellingPlat ? 'Update' : 'Add'}</button> 
          <button type='button' className='add-link' 
          onClick={() =>{
            setNewAffiliatePlats({
              contentLanguage: lng,
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
      contentType={'book'}  
      currentUser={currentUser}
      />
      </div>
      </div>

      {/* Promotion */}
      <div className='sections '>
      <h4 className='m-0 my-3 text-dark'>Promotion</h4>
      <div className='div-border'>
      <div className='inputs6'> 
         <InputNumberVideo text={'Redution'} inputId={'reduction'} change={'promotion'} newPost={newPromotion} getPost={getNewPromotion}/>
         <InputDateTimeVideo text={'Start'} inputId={'displayPeriodStart'} change={'promotion'} newPost={newPromotion} getPost={getNewPromotion}/>
         <InputDateTimeVideo text={'End'} inputId={'displayPeriodEnd'} change={'promotion'} newPost={newPromotion} getPost={getNewPromotion}/>
         
          <SelectsVideo text={'Platform'} inputId={'platforms'}
          selectItems={sellingPlatData?.map(item => [item.platformName !== 'Not Found' ? item.platformName : item.platformNameNotListed ])} 
          change={'promotion'} newPost={newPromotion} getPost={getNewPromotion} multipleOption={true}/>

          <SelectsVideo text={'Status'} inputId={'status'} change={'promotion'}
          selectItems={["Active","Disactive"]} newPost={newPromotion} getPost={getNewPromotion}/>
          
          <div className='add-link-div'>
          <button type='button' className='add-link mx-1' onClick={() => handlePromotion(id)}>Save</button> 
          <button type='button' className='add-link' 
          onClick={() =>{
            setNewPromotion({
              reduction: '',
              displayPeriodStart: '',
              displayPeriodEnd: '',
              status: '',
              platforms: [],
          })}}>Clear</button> 
          </div>
      </div>

      </div>
      </div>

      
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.create-book-container{
  .sections{
    .div-border{
      border: 1px solid  var(--color-6);
      border-radius: var(--borderRadius);
    }
    
  }

  
  
  .header{
    display: flex;
    justify-content: space-between;
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
    /* margin: 10px 0px; */
    display: flex;
    justify-content: center;
    align-items: center;
    a{
      border: none;
      border-radius: var(--borderRadius);
      padding: 2px 10px;
      font-size: 12px;
      background-color: var(--color-12);
      color: var(--color-1);
    }
    button:hover{
      background-color: var(--color-4);
      color: var(--color-1);
    }
  }
}
  .inputs, .inputs3, .inputs4, .inputs5, .inputs6 {
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
  .inputs3{
    grid-template-columns: repeat(3,1fr);
    gap: 20px;
  }

  .inputs4{
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .inputs5{
    grid-template-columns: repeat(5,1fr);
    gap: 20px;
  }
  .inputs6{
    grid-template-columns: repeat(6,1fr);
    gap: 20px;
  }

  .add-link-div{
    width: 200px;
    margin-left: auto;
  .add-link{
    width: 100%;
  }
 
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
  .inputs3{
    grid-template-columns: repeat(3,1fr);
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
  .inputs6{
    grid-template-columns: repeat(6,1fr);
    gap: 20px;
  }
  .add-link-div{
    width: 100px;
    margin-left: auto;
.add-link{
  width: 100%;
}

}
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.create-book-container{
  .inputs, .inputs3, .inputs4, .inputs5, .inputs6 {
    grid-template-columns: repeat(1, 1fr);
    gap: 0px;
  }

  .add-link-div{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  .add-link{
    padding: 5px 10px;
    width: 100%;
  }
}
}
}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default DashboardSingleBook
