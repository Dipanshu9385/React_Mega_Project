import React from 'react'

const Button = ({
    children,
    bgColor = "bg-orange-500",
    textColor ="text-white",
    className = '',
    ...props
}) => {
    return (
        <div>
            <button
                className={` px-4 py-2 ${bgColor} ${textColor} ${className}` } {...props}
            >{children}</button>
        </div>
    )
}

export default Button
