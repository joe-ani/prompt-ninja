'use client'

import { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [profileName, setProfileName] = useState("");
    const [postCreator, setPostCreator] = useState("");
    const [creatorId, setCreatorId] = useState("")

    return (
        <DataContext.Provider value={{ creatorId, setCreatorId, profileName, setProfileName, setPostCreator, postCreator }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
