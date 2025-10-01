import React from 'react'
import Container from '../Layout/Container'
import LargeTitle from '../Layout/Title/LargeTitle'

const Subscription = () => {
    return (
        <Container>
            <div className="grid grid-cols-2 gap-24 py-12 px-16 bg-primary rounded-2xl">
                <div className='col-span-1'>
                    <LargeTitle className="!text-4xl font-tertiary font-bold text-secondary" text="STAY UPTO DATE ABOUT OUR LATEST OFFERS" />
                </div>
                <div className="col-span-1 ">ok</div>
            </div>
        </Container>
    )
}

export default Subscription