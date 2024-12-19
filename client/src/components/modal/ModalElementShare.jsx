import React from 'react'
import styled from 'styled-components'


const ModalElementShare = ({item, selectedData, setSelectedData}) => {
  const {profileImage, role, category, username, spaceName} = item

  return (
    <Wrapper>
    <div className='elem d-flex justify-content-start align-items-center my-2' onClick={() => setSelectedData(selectedData?.find(it => it?._id === item?._id) ? selectedData : [...selectedData, item])}>
    <img src={!profileImage?.name ? import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png' : `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${profileImage?.name}` } alt={username}/>
    <div className='d-flex flex-column justify-content-start align-items-start mx-2'>
      <span className='name m-0'>{username}</span>
      <p className='m-0'>{spaceName}</p>
      <p className='m-0'>{role}</p>
      <p className='m-0'>{category?.slice(0,2)?.join(', ')} {category?.length > 2 ? `+${category?.length - 2}` : ""}</p>
    </div>
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.elem{
  background-color: var(--color-12);
  padding: 5px;
  border-radius: var(--borderRadius);
  cursor: pointer;
  img{
    height: 50px;
    width: 40px;
    border-radius: var(--borderRadius);
    object-fit: cover;
  }
  div{
    span{
      font-size: 12px;
      font-weight: bold;
      color: var(--color-1);
    }
    p{
      font-size: 8px;
    }
  }
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {

}
/* Large devices (desktops) */
@media (max-width: 991px) {

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default ModalElementShare
