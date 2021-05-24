import React from 'react'
import { FullCountry } from './Country'

const showButton = ({country, event}) => {
    return (
        <FullCountry country={event.target} />
    )
}

export default showButton