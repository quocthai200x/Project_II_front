import React from 'react'

function LikeAlert() {
    useEffect(() => {

    }, [])
    
    return (
        <div id ='like-alert' class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
            <span class="font-medium">Like!</span>
        </div>
    )
}

export default LikeAlert