import React, { useEffect, useState } from "react";
import { searchSpotify } from "../utils/spotify";




function SearchBar(props) {
    const [formData, setFormData] = useState({
        query: ''
    });

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
     
        setFormData((prevalue) => {
          return {
            ...prevalue,
            [name]: value
          }
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.query != '') {
            const response = await searchSpotify(formData.query);
            if (response.error) {
                // TODO handle error
            }
            else {
                props.setTracks(response.results.items);
            }
        }
    };

    return (
        <form className="max-w-6xl mx-auto" onSubmit={handleSubmit}>   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" name="query" onChange={handleChange} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Tracks, Albums, Artists..." required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
            </div>
        </form>
    )
}

export default SearchBar;