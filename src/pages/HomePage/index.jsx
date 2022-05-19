import React, {  useEffect } from 'react'

function HomePage() {
    useEffect(() => {
        console.log("BBBBB")
    }, [])

    return (
        <div>HomePage</div>
    )
}

export default HomePage