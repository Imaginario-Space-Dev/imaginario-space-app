import React from 'react'
import { useTranslation } from "react-i18next";
import i18next from 'i18next'
import {languages} from '../../utils/utils'

const Translation = () => {
    const { t } = useTranslation()
  return (

        <select className="form-select" onChange={(e) => i18next.changeLanguage(e.target.value)}>
            <option defaultValue className='d-none'>{ t('language') }</option>
                {languages.map(({code, name, country_code}) => (
                <option value={code} key={country_code}>
                {name}
            </option>
        ))}
      </select>

  )
}

export default Translation
