import React, { useState } from 'react'
import styled from 'styled-components'
import {FaPlay} from 'react-icons/fa'
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";
// import {successLinks} from '../../utils/utils'

const Faq = ({list}) => {

  return (
    <Wrapper>
    <section id="faq" className="py-4 d-flex flex-column justify-content-center align-items-center m-0">
    <h2 className="text-center py-3">FAQ</h2>
    <Accordion className='container d-flex justify-content-center align-items-center w-100 '>
    <div className="row w-100">
        {list.map((item) => {
            const {_id, question, answer, link, image} = item
            return(
                <div key={_id} className='col-md-6'>
                <AccordionItem className='acard-item'>
                <AccordionHeader className='w-100  acord-title'>
                    <h3 className='d-flex justify-content-center align-items-center m-0 p-3'>{question}?</h3>
                </AccordionHeader>

                <AccordionBody className=''>
                    <div className="accordion-body">
                        {answer}
                    </div>
                </AccordionBody>
            </AccordionItem>
            </div>)            
        })}
          </div>  
    </Accordion>
    </section>
    </Wrapper>
    )
}

const Wrapper = styled.div`
.acard-item {
}

.acord-title {
    /* border: solid 1px var(--color-5); */
    background: var(--color-2);
    /* border: 1px solid var(--color-3); */
    border: none ;
    border-bottom: 1px solid var(--color-3);
    border-top: 1px solid var(--color-3);
}
h3{
        color: var(--color-5);
    } 

.accordion-body{
    background: var(--color-2);
    color: var(--color-6);
}


`

export default Faq
