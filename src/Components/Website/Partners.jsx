import React from 'react'

const partnersImage = [
    {
        id: 1,
        src: "/assets/partners (1).png",
        alt: "Partner 1 Logo",
        name: "Partner 1"
    },
    {
        id: 2,
        src: "/assets/partners (2).png",
        alt: "Partner 2 Logo", 
        name: "Partner 2"
    },
    {
        id: 3,
        src: "/assets/partners (3).png",
        alt: "Partner 3 Logo",
        name: "Partner 3"
    },
    {
        id: 4,
        src: "/assets/partners (4).png",
        alt: "Partner 4 Logo",
        name: "Partner 4"
    },
    {
        id: 5,
        src: "/assets/partners (5).png",
        alt: "Partner 5 Logo",
        name: "Partner 5"
    },
    {
        id: 6,
        src: "/assets/partners (1).png",
        alt: "Partner 1 Logo",
        name: "Partner 1"
    },
    {
        id: 7,
        src: "/assets/partners (2).png",
        alt: "Partner 2 Logo", 
        name: "Partner 2"
    },
]

function Partners() {
  return (
    <div className='w-full h-[20vh] bg-white flex items-center justify-center'>
        <div className='flex gap-14 items-center space-x-8 overflow-x-auto'>
            {partnersImage.map((partner) => (
                <img 
                    key={partner.id}
                    src={partner.src}
                    alt={partner.alt}
                    className='h-12 w-30 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300'
                />
            ))}
        </div>
    </div>
  )
}

export default Partners
