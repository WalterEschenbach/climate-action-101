import React from 'react'
import ClimateActionListItem from '../climate-action-item/ClimateActionListItem'
import './climate-action-list.css'

const ClimateActionList = ({data}) => {
    return (
        <div className='d-flex flex-row align-items-center justify-content-center flex-wrap position-relative border'>
            {data?.map(item=> <ClimateActionListItem data={item} key={item.id} />)}
        </div>
    )
}

export default ClimateActionList
