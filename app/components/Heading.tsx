import React from 'react'

type HeadingProps = {
    title: string;
    subtitle?: string;
    center?: boolean;
}

const Heading = ({title, subtitle, center}: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
        <h2 className='text-2xl font-bold'>
            {title}
        </h2>
        {
            subtitle && (
                <p className='text-neutral-500 mt-2 font-light'>
                    {subtitle}
                </p>
            )
        }
    </div>
  )
}

export default Heading;