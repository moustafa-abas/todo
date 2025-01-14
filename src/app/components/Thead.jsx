import React from 'react'

const Thead = () => {
  return (
            <thead className="border-b-2">
              <tr className="text-start ">
                <th className=" text-lg lg:text-2xl text-start capitalize lg:font-semibold font-semibold  px-3 py-3   ">
                  no.
                </th>
                <th className=" text-lg lg:text-2xl text-start capitalize lg:font-semibold font-semibold   px-3 py-3  ">
                  name
                </th>
                <th className=" text-lg lg:text-2xl text-start capitalize lg:font-semibold font-semibold   px-3 py-3  ">
                  email
                </th>
                <th className=" text-lg lg:text-2xl text-start capitalize lg:font-semibold font-semibold   px-3 py-3  ">
                  address
                </th>
                <th className=" text-lg lg:text-2xl text-start capitalize lg:font-semibold font-semibold   px-3 py-3  ">
                  phone
                </th>
                <th className=" text-lg lg:text-2xl text-start capitalize lg:font-semibold font-semibold   px-3 py-3  ">
                  birthDate
                </th>
                <th className=" text-lg lg:text-2xl text-start capitalize lg:font-semibold font-semibold   px-3 py-3  ">
                  gender
                </th>
                <th className=" text-lg lg:text-2xl text-start capitalize lg:font-semibold font-semibold   px-3 py-3  ">
                  level
                </th>
                <th
                  className=" text-lg lg:text-2xl  capitalize lg:font-semibold font-semibold   px-3 py-3  "
                  colSpan="2"
                >
                  actions
                </th>
              </tr>
            </thead>
  )
}

export default Thead
